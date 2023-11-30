const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const authMiddleware = require('../../middlewares/auth');
const User = require('../../models/Users');
const ErrorResponse = require('../../helpers/errResponse');
process.env.JWT_SECRET = 'your_secret_key';

chai.use(chaiHttp);
const { expect } = chai;

describe('auth Middleware', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = {
            headers: {},
            cookies: {},
        };
        mockRes = {};
        mockNext = sinon.spy();
    });

    it('should return an error for an invalid or missing token', async () => {
        await authMiddleware.protect(mockReq, mockRes, mockNext);
        expect(mockNext.firstCall.args[0]).to.be.an.instanceof(ErrorResponse);
        expect(mockNext.firstCall.args[0].statusCode).to.equal(401);
    });

    it('should verify token from authorization header and allow access', async () => {
        const token = jwt.sign({ id: 'validUserId' }, process.env.JWT_SECRET);
        mockReq.headers.authorization = `Bearer ${token}`;

        User.findById = sinon.stub().returns(Promise.resolve({ id: 'validUserId', role: 'user' }));

        await authMiddleware.protect(mockReq, mockRes, mockNext);
        expect(mockNext.calledOnce).to.be.true;
    });

    it('should verify token from cookies and allow access', async () => {
        const token = jwt.sign({ id: 'validUserId' }, process.env.JWT_SECRET);
        mockReq.cookies.token = token;

        User.findById = sinon.stub().returns(Promise.resolve({ id: 'validUserId', role: 'user' }));

        await authMiddleware.protect(mockReq, mockRes, mockNext);
        expect(mockNext.calledOnce).to.be.true;
    });

    it('should return an error for an invalid token', async () => {
        mockReq.headers.authorization = 'Bearer invalidToken';

        await authMiddleware.protect(mockReq, mockRes, mockNext);
        expect(mockNext.firstCall.args[0]).to.be.an.instanceof(ErrorResponse);
        expect(mockNext.firstCall.args[0].statusCode).to.equal(401);
    });

    it('should allow access for authorized roles', async () => {
        mockReq.user = { role: 'admin' };

        const authorizeMiddleware = authMiddleware.authorize('admin', 'user');
        await authorizeMiddleware(mockReq, mockRes, mockNext);
        expect(mockNext.calledOnce).to.be.true;
    });

    it('should return an error for unauthorized roles', async () => {
        mockReq.user = { role: 'guest' };

        const authorizeMiddleware = authMiddleware.authorize('admin', 'user');
        await authorizeMiddleware(mockReq, mockRes, mockNext);
        expect(mockNext.firstCall.args[0]).to.be.an.instanceof(ErrorResponse);
        expect(mockNext.firstCall.args[0].statusCode).to.equal(403);
    });
});
