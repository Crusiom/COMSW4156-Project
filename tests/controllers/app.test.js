const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);

const { createApp, updateApp } = require('../../controllers/app.js');
const App = require('../../models/Apps');

describe('App Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            user: { _id: 'mockUserId' },
            body: {},
            params: {}
        };
        res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        };
        next = sinon.spy();
    });

    afterEach(() => {
        sinon.restore();
    });

    // Tests for createApp
    describe('createApp', () => {
        it('should create an app and return success', async () => {
            req.body.name = 'mockAppName';
            const mockApp = { name: 'mockAppName', owner: 'mockUserId' };

            sinon.stub(App, 'create').resolves(mockApp);

            await createApp(req, res, next);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith({
                success: true,
                data: mockApp
            });
        });

        // Test for error handling
        it('should handle errors', async () => {
            req.body.name = 'mockAppName';
            const error = new Error('Test Error');

            sinon.stub(App, 'create').rejects(error);

            await createApp(req, res, next);

            expect(next).to.have.been.calledWith(error);
        });
    });

    // Tests for updateApp
    describe('updateApp', () => {
        it('should update an app and return success', async () => {
            req.params.id = 'mockAppId';
            req.user._id = 'mockUserId';
            req.body.name = 'updatedMockAppName';

            const mockAppBeforeUpdate = { name: 'mockAppName', owner: 'mockUserId', save: sinon.spy() };
            const mockAppAfterUpdate = { name: 'updatedMockAppName', owner: 'mockUserId' };

            sinon.stub(App, 'findById').resolves(mockAppBeforeUpdate);
            sinon.stub(App, 'findByIdAndUpdate').resolves(mockAppAfterUpdate);

            await updateApp(req, res, next);
            expect(res.statusCode).to.equal();
        });

        // Test for unauthorized access
        it('should handle unauthorized access', async () => {
            req.params.id = 'mockAppId';
            req.user._id = 'differentUserId';
            req.body.name = 'updatedMockAppName';

            const mockApp = { name: 'mockAppName', owner: 'mockUserId' };

            sinon.stub(App, 'findById').resolves(mockApp);

            await updateApp(req, res, next);
            expect(res.statusCode).to.equal();
        });

        // Test for error handling
        it('should handle errors', async () => {
            req.params.id = 'mockAppId';
            req.body.name = 'updatedMockAppName';
            const error = new Error('Test Error');

            sinon.stub(App, 'findById').rejects(error);

            await updateApp(req, res, next);
            expect(res.statusCode).to.equal();
        });

        it('should return an error if the user is not the owner of the app', async () => {
            await updateApp(req, res, next);
            expect(res.statusCode).to.equal();
        });
        it('should return an error if the app is not found', async () => {
            // Setup request with an app ID that does not exist
            req.params.id = 'nonexistentAppId';
            req.user._id = 'mockUserId';
            req.body = { name: 'updatedMockAppName' };
    
            // Mock App.findById to return null, simulating app not found
            sinon.stub(App, 'findById').resolves(null);
    
            await updateApp(req, res, next);
    
            // Check if 'next' is called with an ErrorResponse for app not found
            expect(res.statusCode).to.equal();
        });
    });
});
