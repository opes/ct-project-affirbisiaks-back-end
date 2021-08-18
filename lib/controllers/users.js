const Router = require('express');
const User = require('../models/User.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await User.create(req.body);
      res.send(user);
    } catch(error) {
      next(error); 
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id);
      res.send(user);
    } catch(error) {
      next(error);
    }
  });
