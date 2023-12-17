const request = require('supertest');
const baseUrl = 'http://localhost:3000';
let token;

beforeAll(async () => {
    // Log in and get token
    const loginRes = await request(baseUrl)
        .post('/api/v1/auth/login')
        .send({ email: 'dw3033@columbia.edu', password: '123456' });

    console.log('Login response:', loginRes.body); // Debugging: log the login response
    token = loginRes.body.token;
}, 10000);

describe('App Management Endpoints', () => {
    let createdAppId;

    // Test for creating a new app
    it('should create a new app', async () => {
        const newAppData = {title: 'New App Title'};
        const res = await request(baseUrl)
            .post('/api/v1/apps')
            .set('Authorization', `Bearer ${token}`)
            .send(newAppData);
        expect(res.statusCode).toEqual(200);
        createdAppId = res.body.data._id;
    });

    // Further tests should only be run if createdAppId is defined
    if (createdAppId) {
        // Test for updating an app
        it('should update an app', async () => {
            const updatedData = {
                title: 'Updated Title',
            };
            const res = await request(baseUrl)
                .post(`/api/v1/apps/${createdAppId}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedData);
            expect(res.statusCode).toEqual(201);
        });

        // Test for deleting an app
        it('should delete an app', async () => {
            const res = await request(baseUrl)
                .delete(`/api/v1/apps/${createdAppId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
        });
    }
});
