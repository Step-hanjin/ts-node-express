import { Request, Response, NextFunction } from 'express';
import { Paymonth } from "../models/paymonth";
import { AppDataSource } from '../data-source';

// Create an paymonth
export const createPaymonth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { 
            month,
            start_time,
            end_time
         } = req.body;
        const paymonth = new Paymonth();
        paymonth.month = month;
        paymonth.start_time = start_time;
        paymonth.end_time = end_time;
        const paymonthRepository = AppDataSource.getRepository(Paymonth);
        const result = await paymonthRepository.save(paymonth);

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

// Read all paymonths
export const getPaymonths = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const paymonthRepository = AppDataSource.getRepository(Paymonth);
        const paymonths = await paymonthRepository.find();

        res.status(200).json(paymonths);
    } catch (error) {
        next(error);
    }
};

// Read single paymonth
export const getPaymonthById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const paymonthRepository = AppDataSource.getRepository(Paymonth);
        const paymonth = await paymonthRepository.findOne({
            where: { id },
        });
        if (!paymonth) {
            res.status(404).json({ message: 'Paymonth not fount '});
            return;
        }
        res.status(200).json(paymonth);
    } catch(error) {
        next(error);
    }
};

// // Update an paymonth
export const updatePaymonth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { 
            month,
            start_time,
            end_time
         } = req.body;

        const paymonthRepository = AppDataSource.getRepository(Paymonth);
        const paymonth = await paymonthRepository.findOne({
            where: { id }
        });
        if (!paymonth) {
            res.status(404).json({ message: 'Paymonth not found' });
            return;
        }
        paymonth.month = month;
        paymonth.start_time = start_time;
        paymonth.end_time = end_time;
        const result = await paymonthRepository.save(paymonth);
        res.status(200).json(result);
    } catch(error) {
        next(error);
    }
};

// // Delete an paymonth
export const deletePaymonth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const paymonthRepository = AppDataSource.getRepository(Paymonth);
        const paymonth = await paymonthRepository.findOne({
            where: { id }
        });
        if (!paymonth)  {
            res.status(404).json({ message: 'Paymonth not found' });
            return;
        }
        await paymonthRepository.remove(paymonth);
        res.status(200).json({
            message: 'ok'
        });
    } catch(error) {
        next(error);
    }
};