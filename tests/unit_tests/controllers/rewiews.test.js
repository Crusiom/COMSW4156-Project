const Review = require('../../../models/Reviews');
jest.mock('../../../models/Reviews'); // Mock the Review model

// Mock asyncHandler
const asyncHandler = jest.fn((fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
});

// Mock req, res, next
const req = { body: {}, user: {}, params: {} };
const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
const next = jest.fn();

// Reset mocks before each test
beforeEach(() => {
    jest.clearAllMocks();
});

it('should create a review successfully', async () => {
    req.body = { someReviewData: 'data' };
    req.user = { event: 'someEvent' };
    Review.create.mockResolvedValue({ id: '123', someReviewData: 'data' });

    const { createReview } = require('../../../controllers/reviews');
    await createReview(req, res, next);

    expect(Review.create).toHaveBeenCalledWith({ someReviewData: 'data', event: 'someEvent' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: { id: '123', someReviewData: 'data' },
    });
});
it('should handle errors during review creation', async () => {
    req.body = { someReviewData: 'data' };
    Review.create.mockRejectedValue(new Error('Creation failed'));

    const { createReview } = require('../../../controllers/reviews');
    await createReview(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
});

it('should handle errors during review deletion', async () => {
    req.params.id = '123';
    Review.findByIdAndDelete.mockRejectedValue(new Error('Deletion failed'));

    const { deleteReview } = require('../../../controllers/reviews');
    await deleteReview(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
});
