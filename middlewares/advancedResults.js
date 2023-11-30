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
