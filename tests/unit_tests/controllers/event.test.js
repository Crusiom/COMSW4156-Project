const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);

const { createEvent, updateEvent, deleteEvent, getEvents } = require('../../../controllers/event.js');
const Event = require('../../../models/Events');

// Helper function to mock the request object
const mockRequest = (body, user, params, query) => ({
    body,
    user,
    params,
    query
});

// Helper function to mock the response object
const mockResponse = () => {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    return res;
};

// Mocking the next middleware function
const mockNext = sinon.fake();

describe('Event Controller', () => {
    let res;

    beforeEach(() => {
        res = mockResponse();
    });

    afterEach(() => {
        sinon.restore();
    });


    describe('getEvents', () => {
        it('should get events and return success', async () => {
            const mockEvents = [{ name: 'Event1' }, { name: 'Event2' }];
            sinon.stub(Event, 'find').resolves(mockEvents);

            const req = mockRequest({}, { app: 'someApp' }, {}, {});
            await getEvents(req, res, mockNext);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith({
                success: true,
                data: mockEvents
            });
        });
    });

    describe('createEvent Error Handling', () => {
        it('should handle errors and pass them to the error-handling middleware', async () => {
            const errorMessage = 'Error creating event';
            sinon.stub(Event, 'create').rejects(new Error(errorMessage));

            const req = mockRequest({ name: 'Failed Event' }, { app: 'someApp' }, {}, {});
            await createEvent(req, res, mockNext);

            expect(mockNext).to.have.been.calledWith(sinon.match.has("message", errorMessage));
        });
    });

});


describe('Event Controller', () => {
    let res;

    beforeEach(() => {
        res = mockResponse();
    });

    afterEach(() => {
        sinon.restore();
    });

    // createEvent Tests
    describe('createEvent', () => {
        it('should create an event and return success', async () => {
            const mockEvent = { name: 'Sample Event' };
            sinon.stub(Event, 'create').resolves(mockEvent);

            const req = mockRequest({ name: 'Sample Event' }, { app: 'someApp', name: 'User1' }, {}, {});
            await createEvent(req, res, mockNext);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith({
                success: true,
                data: mockEvent
            });
        });

        // Existing error handling test
    });

    // updateEvent Tests
    describe('updateEvent', () => {
        it('should update an event and return success', async () => {
            const mockEvent = { name: 'Updated Event' };
            sinon.stub(Event, 'findByIdAndUpdate').resolves(mockEvent);

            const req = mockRequest({ name: 'Updated Event' }, {}, { id: 'eventId' }, {});
            await updateEvent(req, res, mockNext);

            expect(res.status).to.have.been.calledWith(201);
            expect(res.json).to.have.been.calledWith({
                success: true,
                data: mockEvent
            });
        });

        it('should handle errors in updateEvent', async () => {
            const errorMessage = 'Error updating event';
            sinon.stub(Event, 'findByIdAndUpdate').rejects(new Error(errorMessage));

            const req = mockRequest({ name: 'Updated Event' }, {}, { id: 'eventId' }, {});
            await updateEvent(req, res, mockNext);

            expect(mockNext).to.have.been.calledWith(sinon.match.has("message", errorMessage));
        });
    });

    // deleteEvent Tests
    describe('deleteEvent', () => {
        it('should delete an event and return success', async () => {
            sinon.stub(Event, 'findByIdAndDelete').resolves();

            const req = mockRequest({}, {}, { id: 'eventId' }, {});
            await deleteEvent(req, res, mockNext);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith({
                success: true,
                data: {}
            });
        });

        it('should handle errors in deleteEvent', async () => {
            const errorMessage = 'Error deleting event';
            sinon.stub(Event, 'findByIdAndDelete').rejects(new Error(errorMessage));

            const req = mockRequest({}, {}, { id: 'eventId' }, {});
            await deleteEvent(req, res, mockNext);

            expect(mockNext).to.have.been.calledWith(sinon.match.has("message", errorMessage));
        });
    });

    // getEvents Tests
    describe('getEvents', () => {
        // Existing success test

        it('should handle errors in getEvents', async () => {
            const errorMessage = 'Error fetching events';
            sinon.stub(Event, 'find').rejects(new Error(errorMessage));

            const req = mockRequest({}, { app: 'someApp' }, {}, {});
            await getEvents(req, res, mockNext);

            expect(mockNext).to.have.been.calledWith(sinon.match.has("message", errorMessage));
        });
    });

    // Test when category is provided in the query
    it('should retrieve events filtered by category', async () => {
        const mockEvents = [{ name: 'Event1', category: 'Category1' }];
        sinon.stub(Event, 'find').withArgs({ app: 'someApp', category: 'Category1' }).resolves(mockEvents);

        const req = mockRequest({}, { app: 'someApp' }, {}, { category: 'Category1' });
        await getEvents(req, res, mockNext);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith({
            success: true,
            data: mockEvents
        });
    });

    // Test when category is not provided in the query
    it('should retrieve all events for an app', async () => {
        const mockEvents = [{ name: 'Event1' }, { name: 'Event2' }];
        sinon.stub(Event, 'find').withArgs({ app: 'someApp' }).resolves(mockEvents);

        const req = mockRequest({}, { app: 'someApp' }, {}, {});
        await getEvents(req, res, mockNext);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith({
            success: true,
            data: mockEvents
        });
    });

    // Error handling test
    it('should handle errors in getEvents', async () => {
        const errorMessage = 'Error fetching events';
        sinon.stub(Event, 'find').rejects(new Error(errorMessage));

        const req = mockRequest({}, { app: 'someApp' }, {}, {});
        await getEvents(req, res, mockNext);

        expect(mockNext).to.have.been.calledWith(sinon.match.has("message", errorMessage));
    });
});
