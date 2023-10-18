const request = require('supertest');
const { createApp, updateApp } = require('../../controllers/app.js');
const App = require('../../models/Apps');  // Fixed path here

jest.mock('../../models/Apps');  // Fixed path here


describe('App Controller', () => {
    
    describe('createApp', () => {
        it('should create an app and return success', async () => {
            
            // Mock user and request body
            const req = {
                user: { _id: 'mockUserId' },
                body: { name: 'mockAppName' }
            };
            
            const mockApp = { name: 'mockAppName', owner: 'mockUserId' };
            
            App.create.mockResolvedValue(mockApp);
            
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            
            await createApp(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockApp
            });
        });
    });

    describe('updateApp', () => {
        it('should update an app and return success', async () => {
            
            const req = {
                params: { id: 'mockAppId' },
                user: { _id: 'mockUserId' },
                body: { name: 'updatedMockAppName' }
            };
            
            const mockAppBeforeUpdate = { name: 'mockAppName', owner: 'mockUserId' };
            const mockAppAfterUpdate = { name: 'updatedMockAppName', owner: 'mockUserId' };
            
            App.findByIdAndUpdate.mockResolvedValue(mockAppAfterUpdate);
            
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            
            await updateApp(req, res);
            
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockAppAfterUpdate
            });
        });
    });
});