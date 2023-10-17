// instead of putting any of the following files( like this one, async.js, auth.js, and error.js) in ../server.js, dump everything here in the `middleware` folder.

// Middleware Responsibility: In an Express.js application, middleware functions are responsible for intercepting and processing HTTP requests before they reach the route handlers. These functions are designed to perform tasks like authentication, error handling, request parsing, and more. They are a fundamental part of the request processing pipeline.

// advancedResults.js is designed to enhance the results of database queries, providing features like filtering, pagination, and sorting. it takes in two params: model (a Mongoose model) and populate (a string or an array for populating related data)
const advancedResults = (model, populate) => async (req, res, next) => {
    let query;

    //copy req.query
    const reqQuery = { ...req.query };

    //fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    //loop over removeField and delete them from reqQuery
    removeFields.forEach((params) => delete reqQuery[params]);

    // create query string
    let queryStr = JSON.stringify(reqQuery);

    // create operators (gt, lt, gte, lte)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

    // finding resources
    query = model.find(JSON.parse(queryStr));

    //select fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    //sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    // //pagination
    // const page = parseInt(req.query.page, 10) || 1;
    // const limit = parseInt(req.query.limit, 10) || 20;
    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;
    // const total = await model.countDocuments();

    // // pagination result
    // const pagination = {};

    // if (endIndex < total) {
    //     pagination.next = {
    //         page: page + 1,
    //         limit,
    //     };
    // }

    // if (startIndex > 0) {
    //     pagination.prev = {
    //         page: page - 1,
    //         limit,
    //     };
    // }

    // query = query.skip(startIndex).limit(limit);

    //populate the data
    if (populate) {
        query = query.populate(populate);
    }

    // executing query
    const result = await query;

    res.advancedResults = {
        success: true,
        count: result.length,
        // pagination,
        data: result,
    };
    next();
};

module.exports = advancedResults;
