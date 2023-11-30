// Create a custom error class ErrorResponse that extends the built-in Error class.

class ErrorResponse extends Error {
    /**
     * Constructor used to create an ErrorResponse instance.
     * @param {string} message - Description of the error message.
     * @param {number} statusCode - HTTP status code to identify the type of error.
     */
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;
