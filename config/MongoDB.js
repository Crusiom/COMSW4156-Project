const mongoose = require('mongoose');
require('dotenv').config();
const DATABASE = process.env.DATABASE;
const MONGODB = process.env.MONGODB;

mongoose.connect(MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: DATABASE,
    maxPoolSize: 100,
});

mongoose.connection.on('connected', function () {
    console.log('Connected to MongoDB Atlas Successfully!');
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose Connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose Connection disconnected');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose Connection Disconnected through app Termination');
        throw new Error('Exit');
    });
});
