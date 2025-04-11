import { Request, Response, NextFunction } from 'express';
import { Contact } from "../models/contact";
import { AppDataSource } from '../data-source';


// interface OriginValue {
//     id: string | number;
//     name: string;
//     email: string;
//     phone: string;
//     note: string;
//     country: { 
//         id: number,
//         name: string 
//     };
// }

// interface ConvertedValue {
//     id: number;
//     name: string;
//     email: string;
//     phone: string;
//     note: string;
//     country: number;
// }

const convertValue = (originValue: any)=> {
    const transform = (value:any) => ({
        id: Number(value.id), // Convert string id to number if necessary
        name: value.name,
        email: value.email,
        phone: value.phone,
        note: value.note,
        country: Number(value.country.id), // Convert country.id to number
        country_name: value.country.name, // Convert country.id to number
    });

    return Array.isArray(originValue)
        ? originValue.map(transform)
        : transform(originValue);
};
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
        const contactRepository = AppDataSource.getRepository(Contact);
        const result = await contactRepository.save(contact);

        const createdContact = await contactRepository.findOne({
            where: { id: result.id },
            relations: {
                country : true
            }
        });

        const resData = convertValue(createdContact);

        res.status(201).json(resData);
    } catch (error) {
        next(error);
    }
};

// Read all contacts
export const getContacts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contactRepository = AppDataSource.getRepository(Contact);
        const contacts = await contactRepository.find({
            relations: {
                country: true
            }
        });
        
        const resData = convertValue(contacts);

        res.status(200).json(resData);
    } catch (error) {
        next(error);
    }
};

// Read single contact
export const getContactById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const contactRepository = AppDataSource.getRepository(Contact);
        const contact = await contactRepository.findOne({
            where: { id },
        });
        if (!contact) {
            res.status(404).json({ message: 'Contact not fount '});
            return;
        }
        const resData = convertValue(contact);
        res.status(200).json(resData);
    } catch(error) {
        next(error);
    }
};

// // Update an contact
export const updateContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { 
            name,
            country,
            email,
            phone,
            note
         } = req.body;

        const contactRepository = AppDataSource.getRepository(Contact);
        const contact = await contactRepository.findOne({
            where: { id }
        });
        if (!contact) {
            res.status(404).json({ message: 'Contact not found' });
            return;
        }
        contact.name = name;
        contact.country = country;
        contact.email = email;
        contact.phone = phone;
        contact.note = note;
        
        await contactRepository.save(contact);

        const updatedContact = await contactRepository.findOne({
            where: { id }, 
            relations: {
                country: true,
            },
        });

        const result = convertValue(updatedContact);
        res.status(200).json(result);
    } catch(error) {
        next(error);
    }
};

// // Delete an contact
export const deleteContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const contactRepository = AppDataSource.getRepository(Contact);
        const contact = await contactRepository.findOne({
            where: { id }
        });
        if (!contact)  {
            res.status(404).json({ message: 'Contact not found' });
            return;
        }
        await contactRepository.remove(contact);
        res.status(200).json({
            message: 'ok'
        });
    } catch(error) {
        next(error);
    }
};