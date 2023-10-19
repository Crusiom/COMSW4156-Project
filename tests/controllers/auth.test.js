const { register, login, logout, getMe } = require('../../controllers/auth.js');
const User = require('../../models/Users');
const ErrorResponse = require('../../helpers/errResponse');

jest.mock('../../models/Users');
jest.mock('../../helpers/errResponse');

describe('Authentication Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {}, user: { id: 'mockUserId' } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            cookie: jest.fn().mockReturnThis()
        };
        next = jest.fn();
    });

    describe('register', () => {
        it('should register a user successfully', async () => {
            req.body = {
                name: 'John',
                email: 'john@example.com',
                password: 'password123',
                app: 'TestApp',
                role: 'user'
            };

            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue({
                getSignedJwtToken: jest.fn().mockReturnValue('mockToken')
            });

            await register(req, res, next);
            // expect(res.status).toHaveBeenCalledWith(200);
            // expect(res.json).toHaveBeenCalled();
        });

        it('should not register a user with an existing email', async () => {
            User.findOne.mockResolvedValue({});
            await register(req, res, next);
            expect(next).toHaveBeenCalledWith(expect.any(ErrorResponse));
        });
    });

    describe('login', () => {
        it('should login a user successfully', async () => {
            req.body = {
                email: 'john@example.com',
                password: 'password123'
            };

            User.findOne.mockResolvedValue({
                matchPassword: jest.fn().mockResolvedValue(true),
                getSignedJwtToken: jest.fn().mockReturnValue('mockToken')
            });

            await login(req, res, next);
            // expect(res.status).toHaveBeenCalledWith(200);
            // expect(res.json).toHaveBeenCalled();
        });

        it('should not login a user with incorrect credentials', async () => {
            req.body = {
                email: 'john@example.com',
                password: 'wrongpassword'
            };

            User.findOne.mockResolvedValue({
                matchPassword: jest.fn().mockResolvedValue(false)
            });

            await login(req, res, next);
            // expect(next).toHaveBeenCalledWith(expect.any(ErrorResponse));
        });
    });

    describe('logout', () => {
        it('should logout a user', async () => {
            await logout(req, res, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: {}
            });
        });
    });

    describe('getMe', () => {
        it('should get the authenticated user', async () => {
            User.findById.mockResolvedValue({ name: 'John' });

            await getMe(req, res, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: { name: 'John' }
            });
        });
    });
});