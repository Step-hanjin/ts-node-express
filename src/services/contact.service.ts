import { AppDataSource } from "../data-source";
import { Contact } from "../models/contact";
import { Repository } from "typeorm";

export class ContactService {
    private contactRepository: Repository<Contact>;

    constructor() {
        this.contactRepository = AppDataSource.getRepository(Contact);
    }

    async getContacts(): Promise<Contact[]> {
        return await this.contactRepository.find({ 
            order: {
              id: 'ASC', // or 'DESC'
            },
            relations: ["country"] 
        });
    }

    async getContactById(id: number): Promise<Contact | null> {
        const resData = await this.contactRepository.findOne({
            where: { id: id},
            relations: {
                country: true
            }
        });

        if (!resData) {
            throw new Error(`Contact with id ${id} not found.`);
        }
        
        return resData;
    }

    async createContact(contact: Contact): Promise<Contact | null> {
        const res = await this.contactRepository.save(contact); 
        const createdContact = await this.getContactById(Number(res.id));

        return createdContact;
    }   

    async updateContact(id: number, contact: Partial<Contact>): Promise<Contact | null> {
        await this.contactRepository.update(id, contact);
        const updatedContact = await this.getContactById(Number(id));

        return await updatedContact;
    }

    async deleteContact(id: number): Promise<boolean> {
        await this.contactRepository.delete(id);
        return true;
    }

    async getContactsByCountryId(countryId: number): Promise<Contact[]> {
        return await this.contactRepository.find({
            where: { country: { id: countryId } },
            order: {
                id: 'ASC', // or 'DESC'
            }
        });
    }

    async deleteContactsByCountryId(countryId: number): Promise<boolean> {
        const contacts = await this.getContactsByCountryId(countryId);
        for (const contact of contacts) {
            await this.contactRepository.delete(contact.id);
        }
        return true;
    }
}