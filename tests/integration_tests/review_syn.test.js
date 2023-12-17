const request = require('supertest');
const baseUrl = 'http://localhost:3000'; // Replace with your real API base URL
let tokenUser1, tokenUser2;
let createdReviewIdUser1;

beforeAll(async () => {
    // Log in and get token for User 1
    const loginResUser1 = await request(baseUrl)
        .post('/api/v1/auth/login')
        .send({ email: 'dw3033@columbia.edu', password: '123456' });
    console.log('Login response User 1:', loginResUser1.body);
    tokenUser1 = loginResUser1.body.token;

    // Log in and get token for User 2
    const loginResUser2 = await request(baseUrl)
        .post('/api/v1/auth/login')
        .send({ email: 'dw3033@columbia.edu', password: '123456' });
    console.log('Login response User 2:', loginResUser2.body);
    tokenUser2 = loginResUser2.body.token;
}, 10000); // Increased timeout

describe('Review Management', function () {
    // User 1 creates a new review
    beforeAll(async () => {
        const fakeReviewData = {
            title: 'Test Review User 1',
            content: 'This is a test review by User 1.',
            eventId: 'TestEventId',
        };

        const createRes = await request(baseUrl)
            .post('/api/v1/reviews')
            .set('Authorization', `Bearer ${tokenUser1}`)
            .send(fakeReviewData);

        expect(createRes.statusCode).toEqual(200);
        createdReviewIdUser1 = createRes.body.data._id;
    });

    it('User 2 should see the review created by User 1', async () => {
        const getRes = await request(baseUrl)
            .get(`/api/v1/reviews/event/TestEventId`)
            .set('Authorization', `Bearer ${tokenUser2}`);

        expect(getRes.statusCode).toEqual(200);
        expect(getRes.body.data).toBeInstanceOf(Array);
        expect(getRes.body.data.some((review) => review._id === createdReviewIdUser1)).toBeTruthy();
    });

    // Additional test cases for update and delete can be added here if needed
});
