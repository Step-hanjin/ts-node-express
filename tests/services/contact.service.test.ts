import { ContactService }  from '../../src/services/contact.service';
import { AppDataSource } from '../../src/data-source';
import { Contact } from '../../src/models/contact';
import { Repository } from 'typeorm';

jest.mock('../../src/data-source', () => ({
    AppDataSource: {
        getRepository: jest.fn(),
    },
}));

describe('ContactService', () => {
    let mockRepo: jest.Mocked<Repository<Contact>>;
    let contactService: ContactService;

    beforeEach(() => {
        mockRepo = {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        } as any;
        (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepo);
        contactService = new ContactService();
    });

    it('getContacts : should find all contacts', async () => {
        const mockContacts = [
            {id: 1, name: 'Contact1', email: "steve@gamil.com", note: "Note 1", phone:"333 333 3333", country: {id: 1, name: 'Country1'}}, 
            {id: 2, name: 'Contact2', email: "john@gmail.com", note: "Note 2", phone:"333 333 3333", country: {id: 1, name: 'Country2'}},
        ] as Contact[];
        mockRepo.find.mockResolvedValue(mockContacts);

        const contacts = await contactService.getContacts();

        expect(contacts).toEqual(mockContacts);
        expect(mockRepo.find).toHaveBeenCalled();
    });

  
    it('getContactById : should return contact by id', async () => {
        const mockContact: Contact = { 
            id: 2, 
            name: 'Contact2', 
            email: "john@gmail.com", 
            note: "Note 2", 
            phone:"333 333 3333", 
            country: {id: 1, name: 'Country2'} 
        };
        mockRepo.findOne.mockResolvedValue(mockContact);
    
        const result = await contactService.getContactById(2);
        expect(mockRepo.findOne).toHaveBeenCalledWith({ 
            where: { id: 2 },
            relations: { country: true } 
        });
        expect(result).toEqual(mockContact);
    });

    it('createContact : should create and return a contact', async () => {
        const contactToSave: Contact = { 
            id: 2,
            name: 'Contact2', 
            email: "john@gmail.com", 
            note: "Note 2", 
            phone: "333 333 3333", 
            country: {id: 1, name: 'Country2'}
        }; 
        const savedContact = {
            id: 2,
            name: 'Contact2', 
            email: "john@gmail.com", 
            note: "Note 2", 
            phone: "333 333 3333", 
            countryId: 1
        } as any;
        const fetchedContact = {
            id: 2,
            name: 'Contact2', 
            email: "john@gmail.com", 
            note: "Note 2", 
            phone: "333 333 3333", 
            country: {id: 1, name: 'Country2'}
        };

        mockRepo.save.mockResolvedValue(savedContact);
        mockRepo.findOne.mockResolvedValue(fetchedContact);

        const result = await contactService.createContact(contactToSave);

        expect(mockRepo.save).toHaveBeenCalledWith(contactToSave);
        expect(mockRepo.findOne).toHaveBeenCalledWith({ 
            where: { id: savedContact.id },
            relations: { country: true } 
        });   
        expect(result).toEqual(fetchedContact);
    });
    
    it("should throw an error if contact not found after saving", async () => {
        const contactToSave = { name: "John" } as any;
        const savedContact = {
            id: 2,
            name: 'Contact2', 
            email: "john@gmail.com", 
            note: "Note 2", 
            phone: "333 333 3333", 
            countryId: 1
        } as any;

        mockRepo.save.mockResolvedValue(savedContact);
        mockRepo.findOne.mockResolvedValue(null); // Simulate not found

        await expect(
            contactService.createContact(contactToSave)
        ).rejects.toThrow(`Contact with id 2 not found.`);
    });

      it('updateContact : should update a contact and return updated value', async () => {
        const contactToUpdate: Contact = {
            id: 2, 
            name: 'Contact2', 
            email: "john@gmail.com", 
            note: "Note 2", 
            phone:"333 333 3333", 
            country: {id: 1, name: 'Country2'}
        };
        const updatedContact: Contact = {
            id: 2,
            name: 'Contact2', 
            email: "john@gmail.com", 
            note: "Note 2", 
            phone: "333 333 3333", 
            country: {id: 1, name: 'Country2'}
        } as any;
        const fetchedContact = {
            id: 2,
            name: 'Contact2', 
            email: "john@gmail.com", 
            note: "Note 2", 
            phone: "333 333 3333", 
            country: {id: 1, name: 'Country2'}
        };

        mockRepo.update.mockResolvedValue({} as any);
        mockRepo.findOne.mockResolvedValue(fetchedContact);
    
        const result = await contactService.updateContact(2, contactToUpdate);
        expect(mockRepo.update).toHaveBeenCalledWith(2, contactToUpdate);
        expect(mockRepo.findOne).toHaveBeenCalledWith({ 
            where: { id: updatedContact.id },
            relations: { country: true } 
        });   
        expect(result).toEqual(updatedContact);
      });
    
      it("should throw an error if contact not found after updating", async () => {
        const contactToUpdate = { name: "John" } as any;
        const updatedContact = {
            id: 2,
            name: 'Contact2', 
            email: "john@gmail.com", 
            note: "Note 2", 
            phone: "333 333 3333", 
            countryId: 1
        } as any;

        mockRepo.update.mockResolvedValue(updatedContact);
        mockRepo.findOne.mockResolvedValue(null); // Simulate not found

        await expect(
            contactService.updateContact(2, contactToUpdate)
        ).rejects.toThrow(`Contact with id 2 not found.`);
    });

      it('deleteContact : should delete a contact and return true', async () => {
        mockRepo.delete.mockResolvedValue({} as any);
    
        const result = await contactService.deleteContact(4);
        expect(mockRepo.delete).toHaveBeenCalledWith(4);
        expect(result).toBe(true);
      });
});