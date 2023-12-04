const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const app = require('../../models/Apps'); // Adjust the path as necessary

chai.use(require('chai-http'));

describe('Event Visibility Integration Tests', () => {
    let userToken = 'userToken'; // Mock user token
    let otherUserToken = 'otherUserToken'; // Mock other user token
    let createdEventId = 'eventId'; // Mock event ID

    beforeEach(() => {
        // Mock user 1 creating an event
        nock('http://localhost:3000') // Adjust your app's host and port
            .post('/api/v1/events')
            .reply(200, {
                data: {
                    _id: createdEventId,
                },
            });

        // Mock user 2 fetching events
        nock('http://localhost:3000') // Adjust your app's host and port
            .get('/api/v1/events')
            .reply(200, {
                data: [{ _id: createdEventId }],
            });
    });

    it('should allow a user to create an event and another user to view it', async () => {
        const createdEventId = 'someEventId'; // Mocked event ID

        // Mock the post request
        nock('http://127.0.0.1:63672')
            .post('/api/v1/events')
            .reply(200, { data: { _id: createdEventId } });

        // Mock the get request
        nock('http://127.0.0.1:63673')
            .get('/api/v1/events')
            .reply(200, { data: [{ _id: createdEventId }] });

        // Perform the test - ensure to await the responses
        const res1 = chai.request(app).post('/api/v1/events').set('Authorization', `Bearer ${userToken}`).send({
            /* event details */
        });

        console.log('res1: ', res1); // Logs the response body of the first request

        const res2 = chai.request(app).get('/api/v1/events').set('Authorization', `Bearer ${otherUserToken}`);

        console.log('res2: ', res2); // Logs the response body of the second request
    });

    afterEach(() => {
        // Clean up and restore all overrides to their original state
        nock.cleanAll();
    });
});
