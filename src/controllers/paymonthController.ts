import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Paymonth } from '../models/paymonth';
import { PaymonthService } from "../services/paymonth.service";

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
        
        const paymonthService = new PaymonthService();
        const result = await paymonthService.createPaymonth(paymonth);

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

// Read all paymonths
export const getPaymonths = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const paymonthService = new PaymonthService();
        const paymonths = await paymonthService.getPaymonths();

        res.status(200).json(paymonths);
    } catch (error) {
        next(error);
    }
};

// Read single paymonth
export const getPaymonthById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const paymonthService = new PaymonthService();
        const paymonth = await paymonthService.getPaymonthById(Number(id));

        if (!paymonth) {
            res.status(404).json({ message: 'Paymonth not found'});
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

         const paymonth = new Paymonth();
         paymonth.month = month;
         paymonth.start_time = start_time;
         paymonth.end_time = end_time;
         const paymonthService = new PaymonthService();
        
         const result = await paymonthService.updatePaymonth(Number(id), paymonth);

        if (!result) {
            res.status(404).json({ message: 'Paymonth not found' });
            return;
        }
        res.status(200).json(result);
    } catch(error) {
        next(error);
    }
};

// // Delete an paymonth
export const deletePaymonth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const paymonthService = new PaymonthService();
        const paymonth = await paymonthService.deletePaymonth(Number(id));

        if (!paymonth)  {
            res.status(404).json({ message: 'Paymonth not found' });
            return;
        }

        res.status(200).json({
            message: 'ok'
        });
    } catch(error) {
        next(error);
    }
};