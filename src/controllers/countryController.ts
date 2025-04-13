import { Request, Response, NextFunction } from 'express';
import { Country } from "../models/country";
import { CountryService } from '../services/country.service';


// Create an country
export const createCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const country = new Country();
        country.name = name;
        
        const countryService = new CountryService();
        const result = await countryService.createCountry(country);

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

// Read all countrys
export const getCountries = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const countryService = new CountryService();
        const countries = await countryService.getCountries();

        res.status(200).json(countries);
    } catch (error) {
        next(error);
    }
};

// Read single country
export const getCountryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const countryService = new CountryService();
        const country = await countryService.getCountryById(+id);

        if (!country) {
            res.status(404).json({ message: 'Country not fount '});
            return;
        }
        res.status(200).json(country);
    } catch(error) {
        next(error);
    }
};

// // Update an country
export const updateCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const countryService = new CountryService;
        const country = await countryService.updateCountry(+id, { name });
        if (!country) {
            res.status(404).json({ message: 'Country not found' });
            return;
        }

        res.status(200).json(country);
    } catch(error) {
        next(error);
    }
};

// // Delete an country
export const deleteCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const countryService = new CountryService();
        const country = await countryService.deleteCountry(+id);
        if (!country)  {
            res.status(404).json({ message: 'Country not found' });
            return;
        }

        res.status(200).json({
            message: 'ok'
        });
    } catch(error) {
        next(error);
    }
};