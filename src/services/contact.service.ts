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
        return await this.contactRepository.findOne({
            where: { id: id},
            relations: {
                country: true
            }
        });
    }

    async createContact(contact: Contact): Promise<Contact> {
        const res = await this.contactRepository.save(contact); 
        const createdContact = await this.getContactById(Number(res.id));

        if (!createdContact) {
            throw new Error('Contact creation failed: not found after save.');
        }

        return createdContact;
    }   

    async updateContact(id: number, contact: Partial<Contact>): Promise<Contact | null> {
        const res = await this.contactRepository.update(id, contact);
        const updatedContact = await this.getContactById(Number(id));

        if (!updatedContact) {
            throw new Error('Contact update failed: not found after update.');
        }

        return await updatedContact;
    }

    async deleteContact(id: number): Promise<boolean> {
        await this.contactRepository.delete(id);
        return true;
    }
}