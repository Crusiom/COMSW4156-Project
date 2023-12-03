const chai = require('chai');
const { expect } = chai;
const ErrorResponse = require('../../../helpers/errResponse');

describe('ErrorResponse', () => {
    it('should create an instance of ErrorResponse with message and statusCode', () => {
        const message = 'Sample error message';
        const statusCode = 404;

        const errorResponse = new ErrorResponse(message, statusCode);

        expect(errorResponse).to.be.an.instanceof(ErrorResponse);
        expect(errorResponse.message).to.equal(message);
        expect(errorResponse.statusCode).to.equal(statusCode);
    });
});
