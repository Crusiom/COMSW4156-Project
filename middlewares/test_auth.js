const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middlewares/async');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/Users');

chai.use(chaiHttp);
const { expect } = chai;

describe('protect Middleware', () => {
//   it('should protect a route with a valid token', async () => {
//     // Mock user data and a valid token
//     const user = {
//       _id: 'validUserId',
//       username: 'testuser',
//       role: 'user',
//     };

//     const token = jwt.sign({ id: user._id }, 'secret', {
//       expiresIn: '1h',
//     });

//     // Mock request with a valid token
//     const mockReq = {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     };
//     const mockRes = {};
//     const mockNext = () => {};

//     // Call the protect middleware with the mock request
//     await authMiddleware.protect(mockReq, mockRes, mockNext);

//     // Ensure that req.user is set and contains the user data
//     expect(mockReq.user).to.deep.equal(user);
//   });

  it('should return an error for an invalid or missing token', async () => {
    // Mock request without a valid token
    const mockReq = {
      headers: {},
    };
    const mockRes = {};
    const mockNext = () => {};

    // Call the protect middleware with the mock request
    try {
      await authMiddleware.protect(mockReq, mockRes, mockNext);
    } catch (err) {
      // Ensure that an error response is generated
      expect(err).to.be.an.instanceof(ErrorResponse);
    }
  });
});
