import { Request, Response, NextFunction } from 'express';
import {
    createCountry,
    getCountries,
    getCountryById,
    updateCountry,
    deleteCountry
} from '../../src/controllers/countryController';
import { CountryService } from '../../src/services/country.service';

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction; 

describe('createCountry', () => {
    beforeEach(() => {
        req = {
            body: { name: 'china' }
        }
    
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
        next = jest.fn();
    });
    
    it('POST api/countries/', async () => {
        const mockCreatedCountry = { id: 1, name: 'china' };

        CountryService.prototype.createCountry = jest.fn().mockResolvedValue(mockCreatedCountry);
        await createCountry(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockCreatedCountry);
    });

    it('Error api/countries/', async () => {
        const error = new Error('Service error');

        CountryService.prototype.createCountry = jest.fn().mockRejectedValue(error);
        await createCountry(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('getCountries', () => {
    it('GET api/countries', async () => {
        const mockGetCountries = [
            {
                id: 1,
                name: 'china'
            }
        ];

        CountryService.prototype.getCountries = jest.fn().mockResolvedValue(mockGetCountries);
        await getCountries(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockGetCountries);
    });

    it('Error api/countries', async() => {
        const error = new Error('Service error');

        CountryService.prototype.getCountries = jest.fn().mockRejectedValue(error);
        await getCountries(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(error);
    });
})

describe('getCountryById', () => {
    beforeEach(() => {
        req = {
            params: {
                id: '1'
            },
        },

        res= {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        },

        next = jest.fn();
    });


    it('GET api/countries/:id', async () => {
        const mockGetCountry = { id: 1,  name: 'china'};

        CountryService.prototype.getCountryById = jest.fn().mockResolvedValue(mockGetCountry);
        await getCountryById(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockGetCountry);
    });

    it('Error api/countries/:id', async () => {
        const error = new Error('Service Error');

        CountryService.prototype.getCountryById = jest.fn().mockRejectedValue(error);
        await getCountryById(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(error);
    });
    
    it('404 api/countries/:id', async () => {
        CountryService.prototype.getCountryById = jest.fn().mockResolvedValue(null);
        await getCountryById(req as Request, res as Response, next);
    
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Country not found' });
    });
});

describe('updateCountryById', () => {
    beforeEach(() => {
        req = {
            params: {
                id: '1'
            },
            body: { 
                id: 1,
                name: 'canada'
            }
        },
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        },
        next = jest.fn();
    });

    it('PUT api/countries/:id', async () => {
        const mockUpdateCountry = {
            id: '1',
            name: 'china'
        }

        CountryService.prototype.updateCountry = jest.fn().mockResolvedValue(mockUpdateCountry)
        await updateCountry(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUpdateCountry);
    });

    it('Error api/countries/:id', async () => {
        const error = new Error('Service Error');

        CountryService.prototype.updateCountry = jest.fn().mockRejectedValue(error);
        await updateCountry(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(error);
    });

    it('404 api/countries/:id', async () => {
        CountryService.prototype.updateCountry = jest.fn().mockResolvedValue(null);
        await updateCountry(req as Request, res as Response, next);
    
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Country not found' });
    });
});

describe('deleteCountry', () => {
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

    it('DELETE api/countries/:id', async () => {
        const mockDeleteCountry = {
            message: 'ok'
        };
        CountryService.prototype.deleteCountry = jest.fn().mockResolvedValue(mockDeleteCountry);
        await deleteCountry(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockDeleteCountry);
    })

    it('Error DELETE api/countries/:id', async() => {
        const error = new Error('Service error');

        CountryService.prototype.deleteCountry = jest.fn().mockRejectedValue(error);
        await deleteCountry(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(error);
    });

    it('404 api/countries/:id', async () => {
        CountryService.prototype.deleteCountry = jest.fn().mockResolvedValue(null);
        await deleteCountry(req as Request, res as Response, next);
    
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Country not found' });
    });
});