const app = require('../../models/Apps');
const request = require('supertest');

describe('Auth Endpoints', () => {
    it('should create a new app', async () => {
        const res = request(app).post('/api/v1/apps').send({
            /* app data */
        });

        expect(res.statusCode).toEqual(); // undefined
        // Additional assertions as needed
    });
    it('should register a user successfully', async () => {
        const res = request(app).post('/api/v1/auth/register').send({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            app: 'Test App',
            role: 'User',
        });

        expect(res.statusCode).toEqual();
    });
    it('should return 400 for invalid registration data', async () => {
        const res = request(app).post('/api/v1/auth/register').send({
            name: '',
            email: 123,
            password: '41564156',
            app: '123123',
            role: 'user',
        });

        expect(res.statusCode).toEqual(); // undefiend
    });
});
