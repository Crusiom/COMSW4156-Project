const { createEvent, updateEvent, deleteEvent, getEvents } = require('../../../controllers/event.js');
const Event = require('../../../models/Events');

// Helper function to mock the request object
const mockRequest = (body, user, params) => ({
    body,
    user,
    params,
});

// Helper function to mock the response object
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

// Mocking the next middleware function
const mockNext = jest.fn();

describe('Event Controller', () => {
    // Clearing all mocks before each test for a clean start
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test suite for the 'createEvent' function
    describe('createEvent', () => {
        it('should create an event and return success', async () => {
            // Mock data for an event
            const mockEvent = { name: 'Sample Event' };
            // Mocking the Event model's create function
            Event.create = jest.fn().mockResolvedValue(mockEvent);

            // Mocking the request and response objects
            const req = mockRequest({ name: 'Sample Event' }, { app: 'someApp' });
            const res = mockResponse();

            // Calling the createEvent function
            await createEvent(req, res, mockNext);

            // Asserting the expected responses
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockEvent,
            });
        });
    });

    // Test suite for the 'updateEvent' function
    describe('updateEvent', () => {
        it('should update an event and return success', async () => {
            // Mock data for an updated event
            const mockEvent = { name: 'Updated Event' };
            // Mocking the Event model's findByIdAndUpdate function
            Event.findByIdAndUpdate = jest.fn().mockResolvedValue(mockEvent);

            // Mocking the request and response objects
            const req = mockRequest({ name: 'Updated Event' }, {}, { id: 'someId' });
            const res = mockResponse();

            // Calling the updateEvent function
            await updateEvent(req, res, mockNext);

            // Asserting the expected responses
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockEvent,
            });
        });
    });

    // Test suite for the 'deleteEvent' function
    describe('deleteEvent', () => {
        it('should delete an event and return success', async () => {
            // Mocking the Event model's findByIdAndDelete function
            Event.findByIdAndDelete = jest.fn().mockResolvedValue({});

            // Mocking the request and response objects
            const req = mockRequest({}, {}, { id: 'someId' });
            const res = mockResponse();

            // Calling the deleteEvent function
            await deleteEvent(req, res, mockNext);

            // Asserting the expected responses
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: {},
            });
        });
    });

    // Test suite for the 'getEvents' function
    describe('getEvents', () => {
        it('should get events and return success', async () => {
            // Mock data for a list of events
            const mockEvents = [{ name: 'Event1' }, { name: 'Event2' }];
            // Mocking the Event model's find function
            Event.find = jest.fn().mockResolvedValue(mockEvents);

            // Mocking the request and response objects
            const req = mockRequest({}, { app: 'someApp' });
            const res = mockResponse();

            // Calling the getEvents function
            await getEvents(req, res, mockNext);

            // Asserting the expected responses
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
});
