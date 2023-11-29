// Load environment variables from a .env file into process.env
require('dotenv').config();

// Import the MongoDB configuration to establish a database connection
require('./config/MongoDB');

// Import required libraries and middleware
const cors = require('cors');
const express = require('express');
const methodOverride = require('method-override');
const errorHandler = require('./middlewares/error');

// Import route handlers for different parts of the application
const auth = require('./routes/auth');
const users = require('./routes/users');
const apps = require('./routes/apps');
const events = require('./routes/events');
const reviews = require('./routes/reviews');

// Create an Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS) middleware to allow requests from any origin
app.use(
    cors({
        origin: '*',
        methods: 'GET, PUT, POST, DELETE',
    }),
);

// Parse JSON requests and handle HTTP method overrides
app.use(express.json());
app.use(methodOverride('_method'));

// Define routes for different parts of the application
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/apps', apps);
app.use('/api/v1/events', events);
app.use('/api/v1/reviews', reviews);

// Use the error handling middleware to handle and respond to errors
app.use(errorHandler);

// Start the Express server at the specified port from the environment variables
const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}!`));
