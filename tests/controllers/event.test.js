const { createEvent, updateEvent, deleteEvent, getEvents } = require('../../controllers/event.js');
const Event = require('../../models/Events');
const mockRequest = (body, user, params) => ({
    body,
    user,
    params,
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = jest.fn();

describe('Event Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createEvent', () => {
        it('should create an event and return success', async () => {
            const mockEvent = { name: 'Sample Event' };
            Event.create = jest.fn().mockResolvedValue(mockEvent);

            const req = mockRequest({ name: 'Sample Event' }, { app: 'someApp' });
            const res = mockResponse();

            await createEvent(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockEvent,
            });
        });
    });

    describe('updateEvent', () => {
        it('should update an event and return success', async () => {
            const mockEvent = { name: 'Updated Event' };
            Event.findByIdAndUpdate = jest.fn().mockResolvedValue(mockEvent);

            const req = mockRequest({ name: 'Updated Event' }, {}, { id: 'someId' });
            const res = mockResponse();

            await updateEvent(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockEvent,
            });
        });
    });

    describe('deleteEvent', () => {
        it('should delete an event and return success', async () => {
            Event.findByIdAndDelete = jest.fn().mockResolvedValue({});

            const req = mockRequest({}, {}, { id: 'someId' });
            const res = mockResponse();

            await deleteEvent(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: {},
            });
        });
    });

    describe('getEvents', () => {
        it('should get events and return success', async () => {
            const mockEvents = [{ name: 'Event1' }, { name: 'Event2' }];
            Event.find = jest.fn().mockResolvedValue(mockEvents);

            const req = mockRequest({}, { app: 'someApp' });
            const res = mockResponse();

            await getEvents(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
});
