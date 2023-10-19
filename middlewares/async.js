// asyncHandler is a higher-order function that simplifies error handling for asynchronous middleware.
const asyncHandler = (fn) => (req, res, next) => {
    // Execute the provided asynchronous function 'fn' and handle any errors.
    // It returns a function that Express can use as middleware.
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Export the asyncHandler function to make it available for use in other parts of the application.
module.exports = asyncHandler;
