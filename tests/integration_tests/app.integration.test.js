const request = require('supertest');
const baseUrl = 'http://localhost:3000'; // Replace with your real API base URL
let token;
let createdAppId;

beforeAll(async () => {
    // Log in and get token
    const loginRes = await request(baseUrl)
        .post('/api/v1/auth/login')
        .send({ email: 'dw3033@columbia.edu', password: '123456' });
    console.log('Login response:', loginRes.body); // Debugging: log the login response
    token = loginRes.body.token;
}, 10000); // Increased timeout

describe('App Management', () => {
    it('should create a new app', async () => {
        const appData = {
            title: 'New App Title',
            commentEnabled: true,
            eventEnabled: true,
            visibleEnabled: true,
        };

        const res = await request(baseUrl).post('/api/v1/apps').set('Authorization', `Bearer ${token}`).send(appData);

        expect(res.statusCode).toEqual(200); // Assuming 200 is the success status code for app creation
        expect(res.body.data.title).toEqual(appData.title); // Verifying the created app data
        createdAppId = res.body.data._id; // Store the ID of the created app for later tests
    });

    // Additional test for updating an app
    it('should update an existing app', async () => {
        const updatedData = {
            title: 'Updated App Title',
            commentEnabled: false,
            // Update other fields as required
        };

        const res = await request(baseUrl)
            .put(`/api/v1/apps/${createdAppId}`) // Using the ID of the created app
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData);

        expect(res.statusCode).toEqual(201); // Assuming 201 is the success status code for updates
        expect(res.body.data.title).toEqual(updatedData.title); // Verifying the updated app data
    });
});
