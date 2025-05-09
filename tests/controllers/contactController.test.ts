import { Request, Response, NextFunction } from "express";
import {
    createContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact
} from '../../src/controllers/contactController';
import { ContactService } from "../../src/services/contact.service";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

describe('createContact', () => {    
    beforeEach(() => {
        req = {
            body: { 
                id: 1,
                name: 'John',
                email: 'john@gmail.com',
                phone: '333 333 333333',
                note: "hi, everyone",
                country: {
                    id: 1,
                    name: 'russia'
                }
            }
        },
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        },
        next = jest.fn()
    });

    it('GET api/contacts', async () => {
        const mockCreateContact = {
            id: 1,
            name: 'John',
            email: 'john@gmail.com',
            phone: '333 333 333333',
            note: "hi, everyone",
            country: {
                id: 1,
                name: 'russia'
            }
        };

        ContactService.prototype.createContact = jest.fn().mockResolvedValue(mockCreateContact);
        await createContact(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockCreateContact);
    });

    it('Error api/contacts', async () => {
        const error = new Error('Contact create error');

        ContactService.prototype.createContact = jest.fn().mockRejectedValue(error);
        await createContact(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('getContacts', () => {
    it('GET api/contacts', async() => {
        const mockGetContacts = [
            {
                id: 1,
                name: 'John',
                email: 'john@gmail.com',
                phone: '333 333 333333',
                note: "hi, everyone",
                country: {
                    id: 1,
                    name: 'russia'
                }
            }
        ];

        ContactService.prototype.getContacts = jest.fn().mockResolvedValue(mockGetContacts);
        await getContacts(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockGetContacts);
    });
    it('Error api/contacts', async () => {
        const error = new Error('Contact getContact error');

        ContactService.prototype.getContacts = jest.fn().mockRejectedValue(error);
        await getContacts(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(error);
    })
});

describe('getContactById', () => {
    beforeEach(() => {
        req = {
            params: { id: '1' }
        },
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        },
        next = jest.fn()
    });

    it('PUT api/contacts/:id', async () => {
        const mockGetContactById = {
            id: 1,
            name: 'John',
            email: 'john@gmail.com',
            phone: '333 333 333333',
            note: "hi, everyone",
            country: {
                id: 1,
                name: 'russia'
            }
        };

        ContactService.prototype.getContactById = jest.fn().mockResolvedValue(mockGetContactById);
        await getContactById(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockGetContactById);
    });
    it('Error api/contacts/:id', async () => {
        const error = new Error('Contact getContactById error');

        ContactService.prototype.getContactById = jest.fn().mockRejectedValue(error);
        await getContactById(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(error);
    });

    it('404 api/contacts/:id', async () => {
        ContactService.prototype.getContactById = jest.fn().mockResolvedValue(null);
        await getContactById(req as Request, res as Response, next);
    
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Contact not found' });
    });
    
});

describe('updateContact', () => {
    beforeEach(() => {
        req = {
            params: { id: '1' },
            body: {
                id: 1,
                name: 'John',
                email: 'john@gmail.com',
                phone: '333 333 333333',
                note: "hi, everyone",
                country: {
                    id: 1,
                    name: 'russia'
                }
            }
        },
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        next = jest.fn()
    });

    it('PUT api/contacts/:id', async () => {
        const mockUpdateContact = {
            id: 1,
            name: 'John',
            email: 'john@gmail.com',
            phone: '333 333 333333',
            note: "hi, everyone",
            country: {
                id: 1,
                name: 'russia'
            }
        };

        ContactService.prototype.updateContact = jest.fn().mockResolvedValue(mockUpdateContact);
        await updateContact(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUpdateContact);
    });
    it('Error api/contacts/:id', async () => {
        const error = new Error("Contact updateContact error");

        ContactService.prototype.updateContact = jest.fn().mockRejectedValue(error);
        await updateContact(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(error);
    });

    it('404 api/contacts/:id', async () => {
        ContactService.prototype.updateContact = jest.fn().mockResolvedValue(null);
        await updateContact(req as Request, res as Response, next);
    
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Contact not found' });
    });
});

describe('deleteContact', () => {
    beforeEach(() => {
        req = {
            params: { id: '1' }
        },
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        },
        next = jest.fn()
    });

    it('DELETE api/contacts/:id', async () => {
        const mockDeleteContact = {
            message: 'ok'
        };

        ContactService.prototype.deleteContact = jest.fn().mockResolvedValue(mockDeleteContact);
        await deleteContact(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockDeleteContact);
    });
    it('Error api/contacts/:id', async () => {
        const error = new Error('Contact deleteContact error');

        ContactService.prototype.deleteContact = jest.fn().mockRejectedValue(error);
        await deleteContact(req as Request, res as Response, next);
        expect(next).toHaveBeenCalledWith(error);
    });
    it('404 api/contacts/:id', async () => {
        ContactService.prototype.deleteContact = jest.fn().mockResolvedValue(null);
        await deleteContact(req as Request, res as Response, next);
    
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Contact not found' });
    });
});