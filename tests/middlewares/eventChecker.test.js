const Event = require('../../models/Events');
jest.mock('../../models/Events'); // Mock the Event model
const ErrorResponse = require('../../helpers/errResponse'); // Adjust the path as necessary

jest.mock('../../models/Events'); // Mock the Event model

// ... rest of your code remains the same

// Mock asyncHandler
const asyncHandler = jest.fn((fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
});

// Mock req, res, next
const req = { user: { event: '123' } };
const res = {}; // Typically not used in middleware
const next = jest.fn();

// Reset mocks before each test
beforeEach(() => {
    jest.clearAllMocks();
    Event.findOneById = jest.fn(); // Ensure the method is a mock function
});
it('should return an error if the event is not found', async () => {
    Event.findOneById.mockResolvedValue(null);
    const { checkEventConfig } = require('../../middlewares/eventChecker');

    const middleware = checkEventConfig('someSetting');
    await middleware(req, res, next);

    expect(Event.findOneById).toHaveBeenCalledWith('123');
    expect(next).toHaveBeenCalledWith(expect.any(ErrorResponse));
});
it('should return an error if the specified setting is disabled', async () => {
    Event.findOneById.mockResolvedValue({ someSetting: false });
    const { checkEventConfig } = require('../../middlewares/eventChecker');

    const middleware = checkEventConfig('someSetting');
    await middleware(req, res, next);

    expect(Event.findOneById).toHaveBeenCalledWith('123');
    expect(next).toHaveBeenCalledWith(expect.any(ErrorResponse));
});
it('should call next without error if the event is found and setting is enabled', async () => {
    Event.findOneById.mockResolvedValue({ someSetting: true });
    const { checkEventConfig } = require('../../middlewares/eventChecker');

    const middleware = checkEventConfig('someSetting');
    await middleware(req, res, next);

    expect(Event.findOneById).toHaveBeenCalledWith('123');
    expect(next).toHaveBeenCalledWith(); // Called without any arguments
});
