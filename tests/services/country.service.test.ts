import { CountryService }  from '../../src/services/country.service';
import { AppDataSource } from '../../src/data-source';
import { Country } from '../../src/models/country';
import { Repository } from 'typeorm';

jest.mock('../../src/data-source', () => ({
    AppDataSource: {
        getRepository: jest.fn(),
    },
}));

describe('CountryService', () => {
    let mockRepo: jest.Mocked<Repository<Country>>;
    let countryService: CountryService;

    beforeEach(() => {
        mockRepo = {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        } as any;
        (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepo);
        countryService = new CountryService();
    });

    it('getCountries : should find all countries', async () => {
        const mockCountries = [
            {id: 1, name: 'Country1'}, 
            {id: 2, name: 'Country2'}
        ] as Country[];
        mockRepo.find.mockResolvedValue(mockCountries);

        const countries = await countryService.getCountries();

        expect(countries).toEqual(mockCountries);
        expect(mockRepo.find).toHaveBeenCalled();
    });

  
    it('getCountries : should find all countries', async () => {
        const mockCountries = [
            {id: 1, name: 'Country1'}, 
            {id: 2, name: 'Country2'}
        ] as Country[];
        mockRepo.find.mockResolvedValue(mockCountries);

        const countries = await countryService.getCountries();

        expect(countries).toEqual(mockCountries);
        expect(mockRepo.find).toHaveBeenCalled();
    });

    it('getCountryById : should return country by id', async () => {
        const mockCountry: Country = { id: 1, name: 'Russia' };
        mockRepo.findOneBy.mockResolvedValue(mockCountry);
    
        const result = await countryService.getCountryById(1);
        expect(result).toEqual(mockCountry);
        expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('createCountry : should create and return a country', async () => {
        const newCountry: Country = { id: 2, name: 'Japan' };
        mockRepo.save.mockResolvedValue(newCountry);
    
        const result = await countryService.createCountry(newCountry);
        expect(result).toEqual(newCountry);
        expect(mockRepo.save).toHaveBeenCalledWith(newCountry);
      });

      it('updateCountry : should update a country and return updated value', async () => {
        const updatedCountry: Country = { id: 3, name: 'Korea' };
        mockRepo.update.mockResolvedValue({} as any);
        mockRepo.findOneBy.mockResolvedValue(updatedCountry);
    
        const result = await countryService.updateCountry(3, updatedCountry);
        expect(mockRepo.update).toHaveBeenCalledWith(3, updatedCountry);
        expect(result).toEqual(updatedCountry);
      });
    
      it('deleteCountry : should delete a country and return true', async () => {
        mockRepo.delete.mockResolvedValue({} as any);
    
        const result = await countryService.deleteCountry(4);
        expect(mockRepo.delete).toHaveBeenCalledWith(4);
        expect(result).toBe(true);
      });
});