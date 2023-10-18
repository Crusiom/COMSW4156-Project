const { register, login, logout, getMe } = require('../../controllers/auth.js');
const User = require('../../models/Users');  // Fixed path here

jest.mock('../../models/Users');  // Fixed path here


describe('Auth Controller', () => {

    afterEach(() => {
        jest.clearAllMocks(); // Reset mock behaviors after each test
    });

    describe('register', () => {
        it('should register a new user', async () => {
            const req = {
                body: {
                    name: 'John Doe',
                    email: 'john@example.com',
                    password: 'password123',
                    app: 'testApp',
                    role: 'user'
                }
            };

            const mockUser = { ...req.body, getSignedJwtToken: jest.fn().mockReturnValue('mockToken') };
            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue(mockUser);

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                cookie: jest.fn()
            };

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                token: 'mockToken'
            });
        });
    });

    describe('login', () => {
        it('should login an existing user', async () => {
            const req = {
                body: {
                    email: 'john@example.com',
                    password: 'password123'
                }
            };

            const mockUser = {
                email: req.body.email,
                password: req.body.password,
                matchPassword: jest.fn().mockResolvedValue(true),
                getSignedJwtToken: jest.fn().mockReturnValue('mockToken')
            };

            User.findOne.mockResolvedValue(mockUser);

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                cookie: jest.fn()
            };

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                token: 'mockToken'
            });
        });
    });

    // You can continue with tests for logout and getMe in a similar manner...

});

