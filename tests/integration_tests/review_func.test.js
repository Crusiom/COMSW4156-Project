const request = require('supertest');
const baseUrl = 'http://localhost:3000'; // Replace with your real API base URL
let token;
let createdReviewId;

beforeAll(async () => {
    // Log in and get token
    const loginRes = await request(baseUrl)
        .post('/api/v1/auth/login')
        .send({ email: 'dw3033@columbia.edu', password: '123456' });
    console.log('Login response:', loginRes.body); // Debugging: log the login response
    token = loginRes.body.token;
}, 10000); // Increased timeout

describe('Review Management', function () {
    // Create a new review for testing
    beforeAll(async () => {
        const fakeReviewData = {
            title: 'Test Review',
            content: 'This is a test review.',
            eventId: 'TestEventId',
        };

        const createRes = await request(baseUrl)
            .post('/api/v1/reviews')
            .set('Authorization', `Bearer ${token}`)
            .send(fakeReviewData);

        expect(createRes.statusCode).toEqual(200);
        createdReviewId = createRes.body.data._id; // Assuming the response body has a data object with _id
    });

    it('should get reviews by event ID', async () => {
        const getRes = await request(baseUrl)
            .get(`/api/v1/reviews/event/TestEventId`)
            .set('Authorization', `Bearer ${token}`);

        expect(getRes.statusCode).toEqual(200);
        expect(getRes.body.data).toBeInstanceOf(Array);
        expect(getRes.body.data.some((review) => review._id === createdReviewId)).toBeTruthy();
    });

    it('should update an existing review', async () => {
        const updatedData = {
            title: 'Updated Review',
            content: 'Updated content.',
            eventId: 'eventId1',
        };

        const updateRes = await request(baseUrl)
            .put(`/api/v1/reviews/${createdReviewId}`) // Use the created review ID
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData);

        expect(updateRes.statusCode).toEqual(201);
        expect(updateRes.body.data.title).toEqual(updatedData.title);
    });

    it('should delete an existing review', async () => {
        const deleteRes = await request(baseUrl)
            .delete(`/api/v1/reviews/${createdReviewId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(deleteRes.statusCode).toEqual(200);
    });
});
