import { AppDataSource } from "../data-source";
import { Country } from "../models/country";
import { Repository } from "typeorm";  

export class CountryService {
    private countryRepository: Repository<Country>;

    constructor() {
        this.countryRepository = AppDataSource.getRepository(Country);
    }

    async getCountries(): Promise<Country[]> {
        return await this.countryRepository.find({
            order: { id: 'ASC' }
        });
    }

    async getCountryById(id: number): Promise<Country | null> {
        return await this.countryRepository.findOneBy({id: id});
    }

    async createCountry(country: Country): Promise<Country> {
        return await this.countryRepository.save(country);
    }

    async updateCountry(id: number, country: Partial<Country>): Promise<Country | null> {
        await this.countryRepository.update(id, country);
        return await this.getCountryById(id);
    }

    async deleteCountry(id: number): Promise<boolean> {
        await this.countryRepository.delete(id);
        return true;
    }
}