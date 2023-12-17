const request = require('supertest');
const baseUrl = 'http://localhost:3000'; // Replace with your server URL
let userToken;
let otherUserToken;
let createdEventId;

beforeAll(async () => {
    // Log in with the user and get token
    const loginResUser = await request(baseUrl)
        .post('/api/v1/auth/login')
        .send({ email: 'dw3033@columbia.edu', password: '123456' });
    userToken = loginResUser.body.token;

    // Log in with the other user and get token
    // Assuming the same credentials for simplicity; adjust if you have different users
    const loginResOtherUser = await request(baseUrl)
        .post('/api/v1/auth/login')
        .send({ email: 'dw3033@columbia.edu', password: '123456' });
    otherUserToken = loginResOtherUser.body.token;
}, 10000);

describe('Event Visibility Integration Tests', () => {
    // Test for creating a new event by one user and its visibility to another user
    it('should allow a user to create an event and another user to view it', async () => {
        // User creates an event
        const eventData = {
            title: 'New Event',
            description: 'Event Description',
            date: '2023-01-01',
            content: 'Detailed content of the event'
        };
        const createRes = await request(baseUrl)
            .post('/api/v1/events')
            .set('Authorization', `Bearer ${userToken}`)
            .send(eventData);

        expect(createRes.statusCode).toEqual(200); // Assuming 200 for successful creation
        createdEventId = createRes.body.data._id;

        // Other user fetches events
        const fetchRes = await request(baseUrl)
            .get('/api/v1/events')
            .set('Authorization', `Bearer ${otherUserToken}`);

        expect(fetchRes.statusCode).toEqual(200); // Assuming 200 for successful fetch
        expect(fetchRes.body.data.some(event => event._id === createdEventId)).toBeTruthy();
    });

    // Additional tests as needed...
});
