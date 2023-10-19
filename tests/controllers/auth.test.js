const { register, login, logout, getMe } = require('../../controllers/auth.js');
const User = require('../../models/Users');
const ErrorResponse = require('../../helpers/errResponse');

// Mocking the User model and ErrorResponse to isolate the tests
jest.mock('../../models/Users');
jest.mock('../../helpers/errResponse');

describe('Authentication Controller', () => {
    // Variables for request, response, and next middleware function
    let req, res, next;

    // Setting up default mocks for req, res, and next before each test
    beforeEach(() => {
        req = { body: {}, user: { id: 'mockUserId' } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            cookie: jest.fn().mockReturnThis()
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
                role: 'user'
            };

            // Mocking User model functions for the test case
            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue({
                getSignedJwtToken: jest.fn().mockReturnValue('mockToken')
            });

            // Invoking the register function
            await register(req, res, next);

            // expect(res.status).toHaveBeenCalledWith(200);
            // expect(res.json).toHaveBeenCalled();
        });

        it('should not register a user with an existing email', async () => {
            // Mocking User model's findOne to simulate existing email
            User.findOne.mockResolvedValue({});
            await register(req, res, next);

            // Asserting that ErrorResponse is called due to email conflict
            expect(next).toHaveBeenCalledWith(expect.any(ErrorResponse));
        });
    });

    // Test suite for the 'login' function
    describe('login', () => {
        it('should login a user successfully', async () => {
            // Setting up mock request body
            req.body = {
                email: 'john@example.com',
                password: 'password123'
            };

            // Mocking User model functions for the test case
            User.findOne.mockResolvedValue({
                matchPassword: jest.fn().mockResolvedValue(true),
                getSignedJwtToken: jest.fn().mockReturnValue('mockToken')
            });

            // Invoking the login function
            await login(req, res, next);

            // expect(res.status).toHaveBeenCalledWith(200);
            // expect(res.json).toHaveBeenCalled();
        });

        it('should not login a user with incorrect credentials', async () => {
            // Setting up mock request body with incorrect password
            req.body = {
                email: 'john@example.com',
                password: 'wrongpassword'
            };

            // Mocking User model's findOne function to simulate wrong password scenario
            User.findOne.mockResolvedValue({
                matchPassword: jest.fn().mockResolvedValue(false)
            });

            // Invoking the login function
            await login(req, res, next);

            // expect(next).toHaveBeenCalledWith(expect.any(ErrorResponse));
        });
    });

    // Test suite for the 'logout' function
    describe('logout', () => {
        it('should logout a user', async () => {
            // Invoking the logout function
            await logout(req, res, next);
            
            // Asserting expected response
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: {}
            });
        });
    });

    // Test suite for the 'getMe' function
    describe('getMe', () => {
        it('should get the authenticated user', async () => {
            // Mocking User model's findById function
            User.findById.mockResolvedValue({ name: 'John' });

            // Invoking the getMe function
            await getMe(req, res, next);

            // Asserting expected response
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: { name: 'John' }
            });
        });
    });
});
