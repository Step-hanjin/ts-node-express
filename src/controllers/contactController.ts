import { Request, Response, NextFunction } from 'express';
import { Contact } from "../models/contact";
import { ContactService } from '../services/contact.service';

// Create an contact
export const createContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { 
            name,
            country,
            email,
            phone,
            note
         } = req.body;
         
        const contact = new Contact();
        contact.name = name;
        contact.country = country;
        contact.email = email;
        contact.phone = phone;
        contact.note = note;
        const contactService = new ContactService();
        const createdContact = await contactService.createContact(contact);

        res.status(201).json(createdContact);
    } catch (error) {
        next(error);
    }
};

// Read all contacts
export const getContacts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contactService = new ContactService();
        const resData = await contactService.getContacts();

        res.status(200).json(resData);
    } catch (error) {
        next(error);
    }
};

// Read single contact
export const getContactById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const idNumber = Number(id);
        const contactService = new ContactService();
        const resData = await contactService.getContactById(idNumber);

        if (!resData) {
            res.status(404).json({ message: 'Contact not fount '});
            return;
        }
        res.status(200).json(resData);
    } catch(error) {
        next(error);
    }
};

// // Update an contact
export const updateContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const idNumber = Number(id);
        const { 
            name,
            country,
            email,
            phone,
            note
         } = req.body;
         const contact = new Contact();
         contact.name = name;
         contact.country = country;
         contact.email = email;
         contact.phone = phone;
         contact.note = note;
 
        const contactService = new ContactService();
        const resData = await contactService.updateContact(idNumber, contact);

        if (!resData) {
            res.status(404).json({ message: 'Contact not found' });
            return;
        }
        
        res.status(200).json(resData);
    } catch(error) {
        next(error);
    }
};

// // Delete an contact
export const deleteContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const idNumber = Number(id);
        const contactService = new ContactService();
        const contact = await contactService.deleteContact(idNumber);
        if (!contact)  {
            res.status(404).json({ message: 'Contact not found' });
            return;
        }
        res.status(200).json({
            message: 'ok'
        });
    } catch(error) {
        next(error);
    }
};