import { AppDataSource } from "../data-source";
import { Contact } from "../models/contact";
import { Repository } from "typeorm";

export class ContactService {
    private contactRepository: Repository<Contact>;

    constructor() {
        this.contactRepository = AppDataSource.getRepository(Contact);
    }

    async getContacts(): Promise<Contact[]> {
        return await this.contactRepository.find({ relations: ["country"] });
    }

    async getContactById(id: number): Promise<Contact | null> {
        return await this.contactRepository.findOneBy({ id: id });
    }

    async createContact(contact: Contact): Promise<Contact> {
        return await this.contactRepository.save(contact);
    }   

    async updateContact(id: number, contact: Partial<Contact>): Promise<Contact | null> {
        await this.contactRepository.update(id, contact);
        return await this.getContactById(id);
    }

    async deleteContact(id: number): Promise<boolean> {
        await this.contactRepository.delete(id);
        return true;
    }
}