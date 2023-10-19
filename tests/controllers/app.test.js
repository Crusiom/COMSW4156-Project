const { createApp, updateApp } = require('../../controllers/app.js');
const App = require('../../models/Apps');

jest.mock('../../models/Apps');

describe('App Controller', () => {
    
    // Clear mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createApp', () => {
        it('should create an app and return success', async () => {
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
            
            const next = jest.fn();
            await createApp(req, res, next);
            
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
          
          App.findById.mockResolvedValue(mockAppBeforeUpdate);
          App.findByIdAndUpdate.mockResolvedValue(mockAppAfterUpdate);
  
          const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
          };
          
          const next = jest.fn();
          await updateApp(req, res, next);
          
          // expect(res.status).toHaveBeenCalledWith(201);
          // expect(res.json).toHaveBeenCalledWith({
          //     success: true,
          //     data: mockAppAfterUpdate
          // });
      });
  });
});

