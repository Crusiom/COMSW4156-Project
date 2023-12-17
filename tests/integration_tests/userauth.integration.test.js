const request = require('supertest');
const baseUrl = 'http://localhost:3000'; // Replace with your real API base URL
let token;

beforeAll(async () => {
    // Log in and get token
    const loginRes = await request(baseUrl)
        .post('/api/v1/auth/login')
        .send({ email: 'dw3033@columbia.edu', password: '123456' });
    console.log('Login response:', loginRes.body); // Debugging: log the login response
    token = loginRes.body.token;
}, 10000); // Increased timeout

describe('User Authentication', () => {
    it('should return 400 for invalid registration data', async () => {
        const invalidUserData = {
            name: '',
            email: 'invalidemail',
            password: '123',
            app: '123123',
            role: 'user',
        };

        const res = await request(baseUrl).post('/api/v1/auth/register').send(invalidUserData);

        expect(res.statusCode).toEqual(400); // 400 for invalid data
        // Add more assertions as needed based on your response structure
    });

    it('should be successful login', async () => {
        const loginData = {
            email: 'dw3033@columbia.edu',
            password: '123456',
        };

        const res = await request(baseUrl).post('/api/v1/auth/login').send(loginData);

        expect(res.statusCode).toEqual(200); // Assuming 200 is the success status code for login
        // Add more assertions as needed based on your response structure
    });

    it('should be login failure with incorrect credentials', async () => {
        const wrongLoginData = {
            email: 'wrong@example.com',
            password: 'wrongpassword',
        };

        const res = await request(baseUrl).post('/api/v1/auth/login').send(wrongLoginData);

        expect(res.statusCode).toEqual(401); // 401 for invalid credentials
    });
});
