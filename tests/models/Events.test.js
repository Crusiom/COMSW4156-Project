const mongoose = require('mongoose');
const Event = require('../../models/Events.js');

// Mocking mongoose methods
const mockSave = jest.fn();
const mockFindById = jest.fn();

mongoose.Model.prototype.save = mockSave;
mongoose.Model.findById = mockFindById;

describe('Event Model Test', () => {
    afterEach(() => {
        mockSave.mockClear();
        mockFindById.mockClear();
    });

    it('create & save event successfully', async () => {
        const validEvent = new Event({
            title: "Test Event",
            author: "John Doe",
            content: "This is a test event content",
            category: "general"
        });
        mockSave.mockResolvedValueOnce(validEvent);
        const savedEvent = await validEvent.save();
        expect(savedEvent).toMatchObject(validEvent);
    });

    it('find event by id', async () => {
        const findEvent = {
            _id: "5f4f5f450f3f3f3f3f3f3f3f",
            title: "Test Event",
            author: "John Doe",
            content: "This is a test event content",
            category: "general"
        };
        mockFindById.mockResolvedValueOnce(findEvent);
        const foundEvent = await Event.findById("5f4f5f450f3f3f3f3f3f3f3f");
        expect(foundEvent).toMatchObject(findEvent);
    });
});

