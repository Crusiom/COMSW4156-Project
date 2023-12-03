const chai = require('chai');
const sinon = require('sinon');
const advancedResults = require('../../../middlewares/advancedResults');

chai.use(require('chai-http'));
const { expect } = chai;

describe('Advanced Results Middleware', () => {
    let mockModel;

    beforeEach(() => {
        mockModel = {
            find: sinon.stub(),
            sort: sinon.stub(),
            select: sinon.stub(),
            populate: sinon.stub(),
        };

        mockModel.find.returns(mockModel);
        mockModel.sort.returns(mockModel);
        mockModel.select.returns(mockModel);
        mockModel.populate.returns(mockModel);
    });

    it('should correctly enhance query results with select and sort', async () => {
        const req = {
            query: {
                select: 'name,age',
                sort: 'age',
                otherParam: 'value',
            },
        };

        const res = {};
        const next = sinon.spy();

        await advancedResults(mockModel)(req, res, next);

        expect(mockModel.find.calledWith({ otherParam: 'value' })).to.be.true;
        expect(mockModel.select.calledWith('name age')).to.be.true;
        expect(mockModel.sort.calledWith('age')).to.be.true;
        expect(next.called).to.be.true;
    });

    it('should correctly handle queries without select and sort parameters', async () => {
        const req = {
            query: {
                otherParam: 'value',
            },
        };

        const res = {};
        const next = sinon.spy();

        await advancedResults(mockModel)(req, res, next);

        expect(mockModel.find.calledWith({ otherParam: 'value' })).to.be.true;
        expect(mockModel.sort.calledWith('-createdAt')).to.be.true;
        expect(next.called).to.be.true;
    });

    it('should handle populate if provided', async () => {
        const req = {
            query: {},
        };

        const res = {};
        const next = sinon.spy();

        const populateOption = 'relatedData';

        await advancedResults(mockModel, populateOption)(req, res, next);

        expect(mockModel.populate.calledWith(populateOption)).to.be.true;
        expect(next.called).to.be.true;
    });

    it('should handle query operators like gt, gte, lt, lte, in', async () => {
        const req = {
            query: {
                price: { gte: '10', lt: '20' },
                status: { in: ['available', 'sold'] },
            },
        };

        const res = {};
        const next = sinon.spy();

        await advancedResults(mockModel)(req, res, next);

        expect(
            mockModel.find.calledWith({
                price: { $gte: '10', $lt: '20' },
                status: { $in: ['available', 'sold'] },
            }),
        ).to.be.true;
        expect(next.called).to.be.true;
    });
});
