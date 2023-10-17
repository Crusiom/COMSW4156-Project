require('dotenv').config();
require('./config/MongoDB');

const cors = require('cors');
const express = require('express');
const methodOverride = require('method-override');

const auth = require('./routes/auth');
const users = require('./routes/users');

const app = express();
app.use(
    cors({
        origin: '*',
        methods: 'GET, PUT, POST, DELETE',
    }),
);
app.use(express.json());
app.use(methodOverride('_method'));

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);

// Start the Express server at specific port.
const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}!`));
