const request = require('supertest');
const baseUrl = 'http://localhost:3000';
let userToken;
let otherUserToken;
let createdEventId;

beforeAll(async () => {
    // Log in and get token
    const loginRes = await request(baseUrl)
        .post('/api/v1/auth/login')
        .send({ email: 'dw3033@columbia.edu', password: '123456' });
    token = loginRes.body.token;
}, 10000); // Increased timeout

describe('Middleware and Model Integration Tests', () => {
    // Test for getting user profiles with advanced results middleware
    it('should return paginated results for Users', async () => {
        const res = await request(baseUrl)
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.success).toEqual(true);
        expect(res.body.data).toBeInstanceOf(Array);
    });

});
