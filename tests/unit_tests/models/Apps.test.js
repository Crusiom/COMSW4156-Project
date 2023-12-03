const mongoose = require('mongoose');
const App = require('../../../models/Apps.js');

const mockSave = jest.fn();
const mockFindById = jest.fn();

mongoose.Model.prototype.save = mockSave;

mongoose.Model.findById = mockFindById;

describe('App Model Test', () => {
    // Clearing mocks after each test to ensure a fresh environment for each test case
    afterEach(() => {
        mockSave.mockClear();
        mockFindById.mockClear();
    });

    // Test case for successful creation and saving of an app
    it('create & save app successfully', async () => {
        // Creating an instance of the App model with valid data
        const validApp = new App({
            title: 'Test App',
            commentEnabled: true,
            eventEnabled: true,
            visibleEnabled: true,
        });
        // Mocking the save function to resolve with the app instance
        mockSave.mockResolvedValueOnce(validApp);

        // Saving the instance and asserting the result
        const savedApp = await validApp.save();
        expect(savedApp).toMatchObject(validApp);
    });

    // Test case for finding an app by its ID
    it('find app by id', async () => {
        // Mock data for the app we want to find
        const findApp = {
            _id: '5f4f5f450f3f3f3f3f3f3f3f',
            title: 'Test App',
            commentEnabled: true,
            eventEnabled: true,
            visibleEnabled: true,
        };
        // Mocking the findById function to resolve with the app data
        mockFindById.mockResolvedValueOnce(findApp);

        // Searching for the app and asserting the result
        const foundApp = await App.findById('5f4f5f450f3f3f3f3f3f3f3f');
        expect(foundApp).toMatchObject(findApp);
    });
});
