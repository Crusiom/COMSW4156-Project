const mongoose = require('mongoose');
const Event = require('../../models/Events.js');

const mockSave = jest.fn();
const mockFindById = jest.fn();

mongoose.Model.prototype.save = mockSave;

mongoose.Model.findById = mockFindById;

// Grouping test cases related to the Event Model
describe('Event Model Test', () => {
    // Clearing mocks after each test to ensure a fresh environment for each test case
    afterEach(() => {
        mockSave.mockClear();
        mockFindById.mockClear();
    });

    // Test case for successful creation and saving of an event
    it('create & save event successfully', async () => {
        // Creating an instance of the Event model with valid data
        const validEvent = new Event({
            title: "Test Event",
            author: "John Doe",
            content: "This is a test event content",
            category: "general"
        });
        
        // Mocking the save function to resolve with the event instance
        mockSave.mockResolvedValueOnce(validEvent);
        
        // Saving the instance and asserting the result
        const savedEvent = await validEvent.save();
        expect(savedEvent).toMatchObject(validEvent);
    });

    // Test case for finding an event by its ID
    it('find event by id', async () => {
        // Mock data for the event we want to find
        const findEvent = {
            _id: "5f4f5f450f3f3f3f3f3f3f3f",
            title: "Test Event",
            author: "John Doe",
            content: "This is a test event content",
            category: "general"
        };
        
        // Mocking the findById function to resolve with the event data
        mockFindById.mockResolvedValueOnce(findEvent);
        
        // Searching for the event and asserting the result
        const foundEvent = await Event.findById("5f4f5f450f3f3f3f3f3f3f3f");
        expect(foundEvent).toMatchObject(findEvent);
    });
});