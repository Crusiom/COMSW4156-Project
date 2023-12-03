const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../../../controllers/users.js');

const User = require('../../../models/Users');

// Helper function to mock the request object
const mockRequest = (body, params) => ({
    body,
    params,
});

// Helper function to mock the response object
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

// Mocking the next middleware function for error handling
const mockNext = jest.fn();

describe('User Controller', () => {
    // Clearing all mocks before each test to ensure a clean slate for each test case
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test suite for the 'getUsers' function
    describe('getUsers', () => {
        it('should get all users and return success', async () => {
            const advancedResults = [{ id: 'user1' }, { id: 'user2' }];
            const res = mockResponse();
            // Simulating middleware behavior where advancedResults is attached to the response object
            res.advancedResults = advancedResults;

            await getUsers({}, res, mockNext);

            // Asserting the expected responses
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(advancedResults);
        });
    });

    // Test suite for the 'getUser' function
    describe('getUser', () => {
        it('should get a single user by ID and return success', async () => {
            // Mock data for a user
            const mockUser = { id: 'user1', profileData: 'some data' };
            // Mocking the User model's findById function
            User.findById = jest.fn().mockResolvedValue(mockUser);

            const req = mockRequest({}, { id: 'user1' });
            const res = mockResponse();

            await getUser(req, res, mockNext);

            // Asserting the expected responses
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockUser,
            });
        });
    });

    // Test suite for the 'createUser' function
    describe('createUser', () => {
        it('should create a user and return success', async () => {
            // Mock data for user input and created user
            const mockUserData = { profileData: 'some data' };
            const mockCreatedUser = { id: 'user1', ...mockUserData };
            // Mocking the User model's create function
            User.create = jest.fn().mockResolvedValue(mockCreatedUser);

            const req = mockRequest(mockUserData);
            const res = mockResponse();

            await createUser(req, res, mockNext);

            // Asserting the expected responses
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockCreatedUser,
            });
        });
    });

    // Test suite for the 'updateUser' function
    describe('updateUser', () => {
        it('should update a user by ID and return success', async () => {
            // Mock data for user input and updated user
            const mockUserData = { profileData: 'updated data' };
            const mockUpdatedUser = { id: 'user1', ...mockUserData };
            // Mocking the User model's findByIdAndUpdate function
            User.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedUser);

            const req = mockRequest(mockUserData, { id: 'user1' });
            const res = mockResponse();

            await updateUser(req, res, mockNext);

            // Asserting the expected responses
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockUpdatedUser,
            });
        });
    });

    // Test suite for the 'deleteUser' function
    describe('deleteUser', () => {
        it('should delete a user by ID and return success', async () => {
            // Mocking the User model's findByIdAndDelete function
            User.findByIdAndDelete = jest.fn().mockResolvedValue({});

            const req = mockRequest({}, { id: 'user1' });
            const res = mockResponse();

            await deleteUser(req, res, mockNext);

            // Asserting the expected responses
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: {},
            });
        });
    });
});
