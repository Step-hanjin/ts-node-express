import { Request, Response, NextFunction } from 'express';
import { Country } from "../models/country";
import { AppDataSource } from '../data-source';

// Create an country
export const createCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const country = new Country();
        country.name = name;
        const countryRepository = AppDataSource.getRepository(Country);
        const result = await countryRepository.save(country);

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

// Read all countrys
export const getCountries = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const countryRepository = AppDataSource.getRepository(Country);
        const countries = await countryRepository.find();

        res.status(200).json(countries);
    } catch (error) {
        next(error);
    }
};

// Read single country
export const getCountryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const countryRepository = AppDataSource.getRepository(Country);
        const country = await countryRepository.findOne({
            where: { id },
        });
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

        const countryRepository = AppDataSource.getRepository(Country);
        const country = await countryRepository.findOne({
            where: { id }
        });
        if (!country) {
            res.status(404).json({ message: 'Country not found' });
            return;
        }
        country.name = name;
        await countryRepository.save(country);
        res.status(200).json(country);
    } catch(error) {
        next(error);
    }
};

// // Delete an country
export const deleteCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const countryRepository = AppDataSource.getRepository(Country);
        const country = await countryRepository.findOne({
            where: { id }
        });
        if (!country)  {
            res.status(404).json({ message: 'Country not found' });
            return;
        }
        await countryRepository.remove(country);
        res.status(200).json({
            message: 'ok'
        });
    } catch(error) {
        next(error);
    }
};