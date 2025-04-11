import request from 'supertest';
import app from '../src/app';
import { AppDataSource } from '../src/data-source';

beforeAll(async () => {
    if (!AppDataSource.isInitialized)
        await AppDataSource.initialize();
});

afterAll(async () => {
    if (AppDataSource.isInitialized)
        await AppDataSource.destroy();
});

describe('Country Controller', () => {
    it('GET /countries should return a list of countries', async () => {
        const response = await request(app).get('/api/countries');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});

