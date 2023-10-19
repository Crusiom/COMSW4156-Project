const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../../controllers/users.js');
const User = require('../../models/Users');
const mockRequest = (body, params) => ({
    body,
    params,
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = jest.fn();

describe('User Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getUsers', () => {
        it('should get all users and return success', async () => {
            const advancedResults = [{ id: 'user1' }, { id: 'user2' }];
            const res = mockResponse();
            res.advancedResults = advancedResults;
            await getUsers({}, res, mockNext);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(advancedResults);
        });
    });

    describe('getUser', () => {
        it('should get a single user by ID and return success', async () => {
            const mockUser = { id: 'user1', profileData: 'some data' };
            User.findById = jest.fn().mockResolvedValue(mockUser);

            const req = mockRequest({}, { id: 'user1' });
            const res = mockResponse();

            await getUser(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockUser,
            });
        });
    });

    describe('createUser', () => {
        it('should create a user and return success', async () => {
            const mockUserData = { profileData: 'some data' };
            const mockCreatedUser = { id: 'user1', ...mockUserData };
            User.create = jest.fn().mockResolvedValue(mockCreatedUser);

            const req = mockRequest(mockUserData);
            const res = mockResponse();

            await createUser(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockCreatedUser,
            });
        });
    });

    describe('updateUser', () => {
        it('should update a user by ID and return success', async () => {
            const mockUserData = { profileData: 'updated data' };
            const mockUpdatedUser = { id: 'user1', ...mockUserData };
            User.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedUser);

            const req = mockRequest(mockUserData, { id: 'user1' });
            const res = mockResponse();

            await updateUser(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockUpdatedUser,
            });
        });
    });

    describe('deleteUser', () => {
        it('should delete a user by ID and return success', async () => {
            User.findByIdAndDelete = jest.fn().mockResolvedValue({});

            const req = mockRequest({}, { id: 'user1' });
            const res = mockResponse();

            await deleteUser(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: {},
            });
        });
    });
});

