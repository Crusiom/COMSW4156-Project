const app = require('../../models/Apps');
const sinon = require('sinon');
const supertest = require('supertest');
const expect = require('chai').expect;
const Review = require('../../models/Reviews'); // Adjust the path to your model

describe('Review Creation and Retrieval with Mock', function () {
    let mock;

    beforeEach(function () {
        // Setup the mock before the tests
        mock = sinon.mock(Review);
    });

    afterEach(function () {
        // Restore the original functionality after testing
        mock.restore();
    });

    it('should create a new review', function () {
        const fakeReviewData = {
            _id: 'userId',
            title: 'Test Review',
            content: 'This is a test review.',
            event: 'Test Event',
        };

        // Mocking Review.create method
        mock.expects('create').resolves(fakeReviewData);

        const res = supertest(app).post('/api/v1/reviews').send(fakeReviewData);

        expect(res.statusCode).to.equal();
    });

    it('should retrieve the created review', function () {
        const fakeReviews = [
            {
                _id: 'userId',
                title: 'Test Review',
                content: 'This is a test review.',
                event: 'Test Event',
            },
        ];

        // Mocking Review.find method
        mock.expects('find').resolves(fakeReviews);

        const res = supertest(app).get('/api/v1/reviews').query({ event: 'Test Event' });

        expect(res.statusCode).to.equal();
    });
});
