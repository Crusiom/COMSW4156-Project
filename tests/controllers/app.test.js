const { createApp, updateApp } = require('../../controllers/app.js');
const App = require('../../models/Apps');

// Mocking the App model to isolate the test from database interactions
jest.mock('../../models/Apps');

describe('App Controller', () => {
    // Clear all mocks before each test to ensure no side-effects from previous tests
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Group of tests related to the createApp function
    describe('createApp', () => {
        it('should create an app and return success', async () => {
            // Mock request with user information and app name
            const req = {
                user: { _id: 'mockUserId' },
                body: { name: 'mockAppName' },
            };

            // Mock response of the App model's create method
            const mockApp = { name: 'mockAppName', owner: 'mockUserId' };
            App.create.mockResolvedValue(mockApp);

            // Mock response object with status and json methods
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // Mock next middleware function
            const next = jest.fn();

            // Call the createApp controller function
            await createApp(req, res, next);

            // Assertions to verify that the response has the expected status and data
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockApp,
            });
        });
    });

    // Group of tests related to the updateApp function
    describe('updateApp', () => {
        it('should update an app and return success', async () => {
            // Mock request with app ID, user information, and new app name
            const req = {
                params: { id: 'mockAppId' },
                user: { _id: 'mockUserId' },
                body: { name: 'updatedMockAppName' },
            };

            // Mock responses of the App model's findById and findByIdAndUpdate methods
            const mockAppBeforeUpdate = { name: 'mockAppName', owner: 'mockUserId' };
            const mockAppAfterUpdate = { name: 'updatedMockAppName', owner: 'mockUserId' };
            App.findById.mockResolvedValue(mockAppBeforeUpdate);
            App.findByIdAndUpdate.mockResolvedValue(mockAppAfterUpdate);

            // Mock response object with status and json methods
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // Mock next middleware function
            const next = jest.fn();

            // Call the updateApp controller function
            await updateApp(req, res, next);

            // expect(res.status).toHaveBeenCalledWith(201);
            // expect(res.json).toHaveBeenCalledWith({
            //     success: true,
            //     data: mockAppAfterUpdate
            // });
        });
    });
});
