import { Request, Response, NextFunction } from "express";
import {
    createPaymonth,
    getPaymonths,
    getPaymonthById,
    updatePaymonth,
    deletePaymonth
} from '../src/controllers/paymonthController';
import { PaymonthService } from "../src/services/paymonth.service";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

describe('createPaymonth', () => {    
    beforeEach(() => {
        req = {
            body: { 
                id: 1,
                month: '2025-4',
                start_time: '2025/02/01 11:22 AM',
                end_time: '2025/02/01 11:22 AM'
            }
        },
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        },
        next = jest.fn()
    });

    it('should respond with 201 and get created paymonth', async () => {
        const mockCreatePaymonth = {
            id: 1,
            month: '2025-4',
            start_time: '2025/02/01 11:22 AM',
            end_time: '2025/02/01 11:22 AM'
        };

        PaymonthService.prototype.createPaymonth = jest.fn().mockResolvedValue(mockCreatePaymonth);
        await createPaymonth(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockCreatePaymonth);
    });

    it('should call next with error if service throws', async () => {
        const error = new Error('Paymonth create error');

        PaymonthService.prototype.createPaymonth = jest.fn().mockRejectedValue(error);
        await createPaymonth(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('getPaymonths', () => {
    it('should respond with 200 and get all paymonths', async() => {
        const mockGetPaymonths = [
            {
                id: 1,
                month: '2025-4',
                start_time: '2025/02/01 11:22 AM',
                end_time: '2025/02/01 11:22 AM'
            }
        ];

        PaymonthService.prototype.getPaymonths = jest.fn().mockResolvedValue(mockGetPaymonths);
        await getPaymonths(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockGetPaymonths);
    });
    it('should call next with error if service throws', async () => {
        const error = new Error('Paymonth getPaymonth error');

        PaymonthService.prototype.getPaymonths = jest.fn().mockRejectedValue(error);
        await getPaymonths(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(error);
    })
});

describe('getPaymonthById', () => {
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

    it('should respond with 200 and get paymonth by id', async () => {
        const mockGetPaymonthById = {
            id: 1,
            month: '2025-4',
            start_time: '2025/02/01 11:22 AM',
            end_time: '2025/02/01 11:22 AM'
        };

        PaymonthService.prototype.getPaymonthById = jest.fn().mockResolvedValue(mockGetPaymonthById);
        await getPaymonthById(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockGetPaymonthById);
    });
    it('should call next with error if service throws', async () => {
        const error = new Error('Paymonth getPaymonthById error');

        PaymonthService.prototype.getPaymonthById = jest.fn().mockRejectedValue(error);
        await getPaymonthById(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(error);
    })
});

describe('updatePaymonth', () => {
    beforeEach(() => {
        req = {
            params: { id: '1' },
            body: {
                id: 1,
                month: '2025-4',
                start_time: '2025/02/01 11:22 AM',
                end_time: '2025/02/01 11:22 AM'
            }
        },
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        next = jest.fn()
    });

    it('should respond with 200 and get updated paymonth', async () => {
        const mockUpdatePaymonth = {
            id: 1,
            month: '2025-4',
            start_time: '2025/02/01 11:22 AM',
            end_time: '2025/02/01 11:22 AM'
        };

        PaymonthService.prototype.updatePaymonth = jest.fn().mockResolvedValue(mockUpdatePaymonth);
        await updatePaymonth(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUpdatePaymonth);
    });
    it('should call next with error if service throws', async () => {
        const error = new Error("Paymonth updatePaymonth error");

        PaymonthService.prototype.updatePaymonth = jest.fn().mockRejectedValue(error);
        await updatePaymonth(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('deletePaymonth', () => {
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

    it('should respond with 200 and get ok message', async () => {
        const mockDeletePaymonth = {
            message: 'ok'
        };

        PaymonthService.prototype.deletePaymonth = jest.fn().mockResolvedValue(mockDeletePaymonth);
        await deletePaymonth(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockDeletePaymonth);
    });
    it('should call next with error if service throws', async () => {
        const error = new Error('Paymonth deletePaymonth error');

        PaymonthService.prototype.deletePaymonth = jest.fn().mockRejectedValue(error);
        await deletePaymonth(req as Request, res as Response, next);
        expect(next).toHaveBeenCalledWith(error);
    });
});