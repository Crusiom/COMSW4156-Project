const request = require('supertest');
const baseUrl = 'http://localhost:3000'; // Replace with your server URL
let token;

beforeAll(async () => {
    // Log in and get token
    const loginRes = await request(baseUrl)
        .post('/api/v1/auth/login')
        .send({ email: 'dw3033@columbia.edu', password: '123456' });

    token = loginRes.body.token;
}, 10000); // Increased timeout

describe('Event Management Endpoints', () => {
    let createdEventId;

    // Test for creating a new event
    it('should create a new event', async () => {
        const eventData = {
            title: 'New Event',
            description: 'Event Description',
            date: '2023-01-01',
            content: 'Detailed content of the event'
        };   
        const res = await request(baseUrl)
            .post('/api/v1/events')
            .set('Authorization', `Bearer ${token}`)
            .send(eventData);
        expect(res.statusCode).toEqual(200);
        createdEventId = res.body.data._id; // Store the ID of the created event for later tests
    });

    // Further tests should only be run if createdEventId is defined
    if (createdEventId) {
        // Test for fetching all events
        it('should fetch all events', async () => {
            const res = await request(baseUrl)
                .get('/api/v1/events')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
        });

        // Test for fetching a single event by ID
        it('should fetch a single event', async () => {
            const res = await request(baseUrl)
                .get(`/api/v1/events/${createdEventId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
        });

        // Test for updating an event
        it('should update an event', async () => {
            const updatedData = { title: 'Updated Event Title', description: 'Updated Description' };
            const res = await request(baseUrl)
                .put(`/api/v1/events/${createdEventId}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedData);
            expect(res.statusCode).toEqual(201);
        });

        // Test for deleting an event
        it('should delete an event', async () => {
            const res = await request(baseUrl)
                .delete(`/api/v1/events/${createdEventId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
        });
    }
});
