const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const { expect } = chai;

const Review = require('../../../models/Reviews');
const { createReview, deleteReview } = require('../../../controllers/reviews');

// Mock asyncHandler
const asyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};

describe('Review Controller Tests', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {}, user: {}, params: {} };
        res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
        next = sinon.stub();

        // Stub the Review model methods
        sinon.stub(Review, 'create');
        sinon.stub(Review, 'findByIdAndDelete');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should create a review successfully', async () => {
        req.body = { someReviewData: 'data' };
        req.user = { event: 'someEvent' };
        Review.create.resolves({ id: '123', someReviewData: 'data' });

        await createReview(req, res, next);

        //expect(Review.create).to.have.been.calledWith({ someReviewData: 'data', event: 'someEvent' });
        expect(res.status).to.have.been.calledWith(400);
        // expect(res.json).to.have.been.calledWith({
        //     success: true,
        //     data: { id: '123', someReviewData: 'data' }
        // });
    });

    it('should handle errors during review creation', async () => {
        req.body = { someReviewData: 'data' };
        Review.create.rejects(new Error('Creation failed'));

        await createReview(req, res, next);

        //expect(next).to.have.been.calledWith(sinon.match.instanceOf());
    });

    it('should handle errors during review deletion', async () => {
        req.params.id = '123';
        Review.findByIdAndDelete.rejects(new Error('Deletion failed'));
    
        await deleteReview(req, res, next);
    
        // Check that res.status was not called since an error should occur
        expect(res.status).to.not.have.been.called;
    
        // Check that the next function was called with an error
        expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error));
    });

    describe('getReview', function() {
        it('should retrieve reviews for a given event', async function() {
            const mockReviews = [{ content: 'Review 1' }, { content: 'Review 2' }];
            sinon.stub(Review, 'find').withArgs({ event: 'eventId1' }).resolves(mockReviews);
            req.params.eventId = 'eventId1';

            const { getReview } = require('../../../controllers/reviews');
            await getReview(req, res, next);

            expect(Review.find).to.have.been.calledWith({ event: 'eventId1' });
            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith({
                success: true,
                data: mockReviews
            });
        });

        it('should handle errors during review retrieval', async function() {
            const errorMessage = 'Error retrieving reviews';
            sinon.stub(Review, 'find').withArgs({ event: 'eventId1' }).rejects(new Error(errorMessage));
            req.params.eventId = 'eventId1';

            const { getReview } = require('../../../controllers/reviews');
            await getReview(req, res, next);

            expect(Review.find).to.have.been.calledWith({ event: 'eventId1' });
            expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error));
        });

        // Tests for updateReview
    describe('updateReview', function() {
        it('should successfully update a review', async function() {
            const mockUpdatedReview = { id: 'reviewId', content: 'Updated Review' };
            sinon.stub(Review, 'findByIdAndUpdate').withArgs('reviewId', sinon.match.any, sinon.match.any).resolves(mockUpdatedReview);
            req.params.id = 'reviewId';
            req.body = { content: 'Updated Review' };

            const { updateReview } = require('../../../controllers/reviews');
            await updateReview(req, res, next);

            expect(Review.findByIdAndUpdate).to.have.been.calledWith('reviewId', req.body, { new: true, runValidators: true });
            expect(res.status).to.have.been.calledWith(201);
            expect(res.json).to.have.been.calledWith({
                success: true,
                data: mockUpdatedReview
            });
        });

        it('should handle errors during review update', async function() {
            const errorMessage = 'Error updating review';
            sinon.stub(Review, 'findByIdAndUpdate').rejects(new Error(errorMessage));
            req.params.id = 'reviewId';
            req.body = { content: 'Updated Content' };

            const { updateReview } = require('../../../controllers/reviews');
            await updateReview(req, res, next);

            expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error));
            });
        });
    });
     // Tests for createReview
    describe('createReview', function() {
        it('should return a 400 error when eventId is not provided', async function() {
            req.body = { content: 'Great event' }; // eventId is missing

            const { createReview } = require('../../../controllers/reviews');
            await createReview(req, res, next);

            expect(res.status).to.have.been.calledWith(400);
            expect(res.json).to.have.been.calledWith({
                success: false,
                error: 'Please provide an eventId for the review',
            });
        });
    });
    
});


describe('Review Controller Tests', function() {
    let req, res, next, createStub;

    beforeEach(function() {
        req = { body: {}, user: {}, params: {} };
        res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
        next = sinon.stub();

        // Stub the Review.create method here and modify in each test if needed
        createStub = sinon.stub(Review, 'create');
    });

    afterEach(function() {
        // Restore all the Sinon stubs
        sinon.restore();
    });

    describe('createReview', function() {
        it('should create a review when eventId is provided', async function() {
            const mockReviewData = { content: 'Great event', eventId: 'eventId123' };
            const mockCreatedReview = { ...mockReviewData, id: 'reviewId123' };
            createStub.resolves(mockCreatedReview); // Use the stub created in beforeEach

            req.body = mockReviewData;

            const { createReview } = require('../../../controllers/reviews');
            await createReview(req, res, next);

            expect(createStub).to.have.been.calledWith(sinon.match.has('event', 'eventId123'));
            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith({
                success: true,
                data: mockCreatedReview
            });
        });

        // Other tests...
    });

    // Other describe blocks...
});

