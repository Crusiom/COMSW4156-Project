require('dotenv').config();
require('./config/MongoDB')

const cors = require('cors');
const express = require('express');
const methodOverride = require('method-override');


const app = express();
app.use(
    cors({
        origin: '*',
        methods: 'GET, PUT, POST, DELETE'
    }),
);
app.use(express.json());
app.use(methodOverride('_method'));

// Start the Express server at specific port.
const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}!`));
