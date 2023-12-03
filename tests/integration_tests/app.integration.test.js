const app = require('../../models/Apps');
const request = require('supertest');

describe('Auth Endpoints', () => {
    it('should create a new app', async () => {
        const res = request(app).post('/api/v1/apps').send({
            /* app data */
        });

        expect(res.statusCode).toEqual();
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

    it('should register a user successfully', async () => {
        const res = request(app).post('/api/v1/auth/register').send({
            name: 'New User',
            email: 'newuser@example.com',
            password: 'password123',
            app: 'Test App',
            role: 'User',
        });
        expect(res.statusCode).toEqual(); // Adjust according to your API
    });

    // Test for user registration with existing email
    it('should fail to register a user with existing email', async () => {
        const res = request(app).post('/api/v1/auth/register').send({
            name: 'Existing User',
            email: 'existing@example.com', // Use an email that's already registered
            password: 'password123',
            app: 'Test App',
            role: 'User',
        });
        expect(res.statusCode).toEqual(); // Or another appropriate error code
    });

});
