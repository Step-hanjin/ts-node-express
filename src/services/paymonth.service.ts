import { AppDataSource } from "../data-source";
import { Paymonth } from "../models/paymonth";
import { Repository } from "typeorm";

export class PaymonthService {
    private paymonthRepository: Repository<Paymonth>;

    constructor() {
        this.paymonthRepository = AppDataSource.getRepository(Paymonth);
    }

    async getPaymonths() : Promise<Paymonth[]> {
        return await this.paymonthRepository.find();
    }

    async getPaymonthById(id : number) : Promise<Paymonth | null> {
        return await this.paymonthRepository.findOneBy({id: id});
    }

    async createPaymonth(paymonth: Paymonth) : Promise<Paymonth> {
        return await this.paymonthRepository.save(paymonth);
    }   

    async updatePaymonth(id: number, paymonth: Partial<Paymonth>) : Promise<Paymonth | null> {
        await this.paymonthRepository.update(id, paymonth);
        return await this.getPaymonthById(id);
    }   

    async deletePaymonth(id: number) : Promise<boolean> {
        await this.paymonthRepository.delete(id);
        return true;
    }

}