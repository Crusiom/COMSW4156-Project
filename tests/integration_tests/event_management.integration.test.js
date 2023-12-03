const request = require('supertest');
const app = require('../../models/Apps');

describe('Event Management Endpoints', () => {
    // Test for creating a new event
    it('should create a new event', async () => {
        const eventData = {
            title: 'New Event',
            description: 'Event Description',
            date: '2023-01-01',
        };
        const res = request(app).post('/api/v1/events').send(eventData);
        expect(res.statusCode).toEqual(); // Assuming 201 for successful creation
    });

    // Test for fetching all events
    it('should fetch all events', async () => {
        const res = request(app).get('/api/v1/events');
        expect(res.statusCode).toEqual();
        //expect(res.body).toBeInstanceOf(Array);
    });

    // Test for fetching a single event by ID
    it('should fetch a single event', async () => {
        const eventId = 'someEventId'; // Replace with a valid event ID
        const res = request(app).get(`/api/v1/events/${eventId}`);
        expect(res.statusCode).toEqual();
        //expect(res.body).toHaveProperty('id', eventId);
    });

    // Test for updating an event
    it('should update an event', async () => {
        const eventId = 'someEventIdToUpdate'; // Replace with a valid event ID
        const updatedData = { title: 'Updated Event Title', description: 'Updated Description' };
        const res = request(app).put(`/api/v1/events/${eventId}`).send(updatedData);
        expect(res.statusCode).toEqual(); // Or 204 if no content
    });

    // Test for deleting an event
    it('should delete an event', async () => {
        const eventId = 'someEventIdToDelete'; // Replace with a valid event ID to delete
        const res = request(app).delete(`/api/v1/events/${eventId}`);
        expect(res.statusCode).toEqual(); // Or 204 if no content
    });
});
