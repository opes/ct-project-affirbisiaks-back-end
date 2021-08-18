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
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const user = await User.update(req.body, { 
        where: {
          id: req.params.id
        },
        returning: true
      });
      res.send(user[1][0]);
    } catch(error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      await User.destroy({ 
        where: {
          id: req.params.id
        }
      });
      res.send({ success: true });
    } catch(error) {
      next(error);
    }
  });
