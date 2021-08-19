const express = require('express');
const app = express();
const usersController = require('./controllers/users');
const affirmationContoller = require('./controllers/affirmations.js');

app.use(express.json());

app.use('/api/v1/users', usersController);
app.use('/api/v1/affirmation', affirmationContoller);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
