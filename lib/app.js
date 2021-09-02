const express = require('express');
const app = express();
const usersController = require('./controllers/users');
const affirmationsController = require('./controllers/affirmations.js');
// body-parser is deprecated, but you can use `express.urlencoded` instead
const cors = require('cors');

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended:false }));

app.use('/api/v1/users', usersController);
app.use('/api/v1/affirmations', affirmationsController);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
