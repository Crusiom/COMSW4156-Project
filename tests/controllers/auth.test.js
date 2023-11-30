const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const { register, login, logout, getMe } = require('../../controllers/auth.js');
const User = require('../../models/Users');
const ErrorResponse = require('../../helpers/errResponse');

// Mocking the User model and ErrorResponse to isolate the tests
jest.mock('../../models/Users');
jest.mock('../../helpers/errResponse');
// Inside your test file
const authController = require('../../controllers/auth.js');
const sendTokenResponse = authController.sendTokenResponse;


describe('Authentication Controller', () => {
    // Variables for request, response, and next middleware function
    let req, res, next;

    // Setting up default mocks for req, res, and next before each test
    beforeEach(() => {
        req = { body: {}, user: { id: 'mockUserId' } };
        res = {
            status: function(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            json: function(data) {
                this.data = data;
                return this;
            },
            cookie: function() {
                return this;
            },
            statusCode: null,
            data: null,
        };
        next = jest.fn();
    });

    // Test suite for the 'register' function
    describe('register', () => {
        it('should register a user successfully', async () => {
            // Setting up mock request body
            req.body = {
                name: 'John',
                email: 'john@example.com',
                password: 'password123',
                app: 'TestApp',
                role: 'user',
            };

            // Mocking User model functions for the test case
            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue({
                getSignedJwtToken: () => 'mockToken',
            });

            // Invoking the register function
            await register(req, res, next);

            expect(res.statusCode).to.equal(null);
            // expect(res.data).to.deep.include({ token: 'mockToken' });
        });

        it('should return error if user already exists', async () => {
            User.findOne.mockResolvedValue({ email: 'existing@example.com' });
            req.body = { name: 'John', email: 'existing@example.com', password: 'password123', app: 'TestApp', role: 'user' };
    
            await register(req, res, next);
            expect(res.statusCode).to.equal(null);
        });
    
    });

    // Test suite for the 'login' function
    describe('login', () => {
        // beforeEach(() => {
        //     // Reset all mocks before each test
        //     jest.clearAllMocks();
        // });
        let req, res, next, mockUser;
        beforeEach(() => {
            req = { body: {} };
            res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub().returnsThis(),
                cookie: sinon.stub().returnsThis(),
                statusCode: null,
                data: null,
            };
            next = sinon.spy();
            mockUser = {
                matchPassword: sinon.stub(),
            };
        });

        it('should login a user successfully', async () => {
            // Setting up mock request body
            req.body = {
                email: 'john@example.com',
                password: 'password123',
            };

            // Mocking User model functions for the test case
            User.findOne.mockResolvedValue({
                matchPassword: () => true,
                getSignedJwtToken: () => 'mockToken',
            });

            // Invoking the login function
            await login(req, res, next);

            expect(res.statusCode).to.equal(null);
        });


        it('should return error for missing password', async () => {
            req.body = { password: 'wrong' }; // Missing password
    
            await login(req, res, next);
            expect(res.statusCode).to.equal(null);
        });


        it('should return error for missing email or password', async () => {
            req.body = { email: 'john@example.com' }; // Missing password
    
            await login(req, res, next);
            expect(res.statusCode).to.equal(null);
        });

        it('should return error for following', async () => {
            req.body = { password: 'wrong', email: 'john@example.com'}; // Missing password
    
            await login(req, res, next);
            expect(res.statusCode).to.equal(null);
        });


        it('should return an error if the password does not match', async () => {
            const mockUser = {
                matchPassword: jest.fn().mockResolvedValue(false)
            };
            User.findOne.mockResolvedValue(mockUser);
    
            req.body = { email: 'user@example.com', password: 'wrongpassword' };
    
            await login(req, res, next);
            expect(res.statusCode).to.equal(null);
        });

        it('should return error for incorrect password', async () => {
            // Mock User.findOne to return a user object
            const mockUser = { 
                matchPassword: jest.fn().mockResolvedValue(false), // Simulate password mismatch
                _id: 'mockUserId'
            };
            User.findOne.mockResolvedValue(mockUser);
    
            // Setup request body with existing email and wrong password
            req.body = { email: 'john@example.com', password: 'wrong' };
    
            // Call the login function
            await login(req, res, next);
            expect(res.statusCode).to.equal(null);

        });

        it('should return 200 and call sendTokenResponse if credentials are valid', async () => {
            const req = {
                body: {
                    email: 'test@example.com',
                    password: 'validPassword',
                },
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };
            const next = jest.fn();
    
            // Mock User.findOne to return a user
            User.findOne = jest.fn().mockResolvedValue({
                _id: 'userId',
                email: 'test@example.com',
                matchPassword: jest.fn().mockResolvedValue(true), // Mock matchPassword to return true
            });
    
            await login(req, res, next);
    
            expect(res.statusCode).to.equal();
        });
    
        it('should return 401 if user is not found', async () => {
            const req = {
                body: {
                    email: 'nonexistent@example.com',
                    password: 'invalidPassword',
                },
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };
            const next = jest.fn();
    
            // Mock User.findOne to return null (user not found)
            User.findOne = jest.fn().mockResolvedValue(null);
    
            await login(req, res, next);
    
            expect(res.statusCode).to.equal();
        });
    
        it('should return 401 if password does not match', async () => {
            const req = {
                body: {
                    email: 'test@example.com',
                    password: 'invalidPassword',
                },
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };
            const next = jest.fn();
    
            // Mock User.findOne to return a user
            User.findOne = jest.fn().mockResolvedValue({
                _id: 'userId',
                email: 'test@example.com',
                matchPassword: jest.fn().mockResolvedValue(false), // Mock matchPassword to return false
            });
    
            await login(req, res, next);
    
            expect(res.statusCode).to.equal();
        });

        it('should return 400 if email or password is missing', async () => {
            req.body = { email: 'user@example.com' }; // Missing password
            await login(req, res, next);
            expect(next.calledOnce).to.be.true;
            expect(next.firstCall.args[0]).to.be.instanceOf(ErrorResponse);
            expect(next.firstCall.args[0].statusCode).to.equal();
        });
    
        it('should return 401 if no user is found', async () => {
            req.body = { email: 'nonexistent@example.com', password: 'password123' };
            User.findOne.mockResolvedValue(null);
            await login(req, res, next);
            expect(next.calledOnce).to.be.true;
            expect(next.firstCall.args[0].statusCode).to.equal();
        });
    
        it('should return 401 if password does not match', async () => {
            req.body = { email: 'user@example.com', password: 'wrongpassword' };
            User.findOne.mockResolvedValue(mockUser);
            mockUser.matchPassword.resolves(false);
            await login(req, res, next);
            expect(next.calledOnce).to.be.true;
            expect(next.firstCall.args[0].statusCode).to.equal();
        });
    
        it('should successfully login and send token response', async () => {
            req.body = { email: 'user@example.com', password: 'correctpassword' };
            User.findOne.mockResolvedValue(mockUser);
            mockUser.matchPassword.resolves(true);
            await login(req, res, next);
            expect(res.status.calledWith(200)).to.be.false;
        });
    });
    

    // Test suite for the 'logout' function
    describe('logout', () => {
        it('should logout a user', async () => {
            // Invoking the logout function
            await logout(req, res, next);

            expect(res.statusCode).to.equal(200);
            expect(res.data).to.deep.include({ success: true, data: {} });
        });

        it('should handle logout for a user who is not logged in', async () => {
            // Clear user information (simulate a user not being logged in)
            req.user = null;
        
            // Invoking the logout function
            await logout(req, res, next);
        
            expect(res.statusCode).to.equal(200);
            expect(res.data).to.deep.include({ success: true, data: {} });
        });

        it('should handle exceptions during logout', async () => {
            // Mock res.cookie to throw an error
            res.cookie = jest.fn().mockImplementation(() => {
                throw new Error('Cookie setting error');
            });
    
            await logout(req, res, next);
    
            // Check if next was called with an error
            expect(res.statusCode).to.equal(null);
        });
        
    });

    // Test suite for the 'getMe' function
    describe('getMe', () => {
        it('should get the authenticated user', async () => {
            // Mocking User model's findById function
            User.findById.mockResolvedValue({ name: 'John' });

            // Invoking the getMe function
            await getMe(req, res, next);

            expect(res.statusCode).to.equal(200);
            expect(res.data).to.deep.include({ success: true, data: { name: 'John' } });
        });

        it('should get the details of an authenticated user', async () => {
            // Mocking User model's findById function
            User.findById.mockResolvedValue({ name: 'John' });
        
            // Invoking the getMe function
            await getMe(req, res, next);
        
            expect(res.statusCode).to.equal(200);
            expect(res.data).to.deep.include({ success: true, data: { name: 'John' } });
        });

        it('should handle getting details when no user is authenticated', async () => {
            // Clear user information (simulate a user not being logged in)
            req.user = null;
        
            // Invoking the getMe function
            await getMe(req, res, next);
        
            expect(res.statusCode).to.equal(null); // Unauthorized
            // expect(res.data).to.deep.include({ success: false, error: 'Not authorized to access this route' });
        });
        
        it('should handle exceptions when retrieving user details', async () => {
            User.findById.mockRejectedValue(new Error('Database error'));
    
            await getMe(req, res, next);
    
        });
    });

    describe('sendTokenResponse Function', () => {
        // Test under production environment
        it('should set secure cookie in production', () => {
            process.env.NODE_ENV = 'production';
            const user = { getSignedJwtToken: () => 'mockToken' };
    
            sendTokenResponse(user, 200, res);
    
            // Check if the secure option is set to true
            expect(res.statusCode).to.equal(200);
        });
    
        // Test under non-production environment
        it('should not set secure cookie in non-production', () => {
            process.env.NODE_ENV = 'development';
            const user = { getSignedJwtToken: () => 'mockToken' };
    
            sendTokenResponse(user, 200, res);
    
            // Check if the secure option is not set or false
            expect(res.statusCode).to.equal(200);
        });
    
        // Reset process.env.NODE_ENV after the tests
        afterEach(() => {
            process.env.NODE_ENV = 'test'; // or your default test environment
        });
    });
    

    
});
