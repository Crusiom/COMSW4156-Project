const chai = require('chai');
const chaiHttp = require('chai-http');
const asyncHandler = require('../middlewares/async');

chai.use(chaiHttp);
const { expect } = chai;

describe('asyncHandler Middleware', () => {
  it('should handle a successful async function', (done) => {
    const asyncFn = async (req, res, next) => {
      // Simulate an asynchronous operation (e.g., fetching data)
      const data = await Promise.resolve('Data from async function');
      res.send(data);
    };

    const middleware = asyncHandler(asyncFn);

    const mockReq = {};
    const mockRes = {
      send: (data) => {
        expect(data).to.equal('Data from async function');
        done();
      },
    };
    const mockNext = (err) => {
      done(err);
    };

    middleware(mockReq, mockRes, mockNext);
  });

  it('should handle an error in the async function', (done) => {
    const asyncFn = async (req, res, next) => {
      // Simulate an asynchronous operation that results in an error
      throw new Error('An error occurred in async function');
    };

    const middleware = asyncHandler(asyncFn);

    const mockReq = {};
    const mockRes = {};
    const mockNext = (err) => {
      expect(err).to.be.an.instanceof(Error);
      expect(err.message).to.equal('An error occurred in async function');
      done();
    };

    middleware(mockReq, mockRes, mockNext);
  });
});
