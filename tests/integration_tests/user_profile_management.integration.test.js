const request = require('supertest');
const baseUrl = 'http://localhost:3000';
let token;

beforeAll(async () => {
    // Log in and get token
    const loginRes = await request(baseUrl)
        .post('/api/v1/auth/login')
        .send({ email: 'dw3033@columbia.edu', password: '123456' });
    token = loginRes.body.token;
}, 10000); // Increased timeout

describe('API Integration Tests', () => {
    const validUserId = '6568e8e386198d93d030ec27'; 

    it('should create a new app', async () => {
        const appData = {
            title: 'New App'
        };
        const res = await request(baseUrl)
            .post('/api/v1/apps')
            .set('Authorization', `Bearer ${token}`)
            .send(appData);
        expect(res.statusCode).toEqual(200); // Success
        expect(res.body).toHaveProperty('data');
    });

    it('should fetch user profile', async () => {
        // Ensure validUserId is a valid ObjectId from your database
        const res = await request(baseUrl)
            .get(`/api/v1/users/${validUserId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200); // Success
        expect(res.body).toHaveProperty('data');
    });
});
