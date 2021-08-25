const Router = require('express');
const User = require('../models/User.js');
const UserService = require('../services/UserService.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.createAffirmations(req.body);
      res.send(user);
    } catch(error) {
      next(error); 
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const user = await User.findAll({
        where: {
          googleId: req.params.id
        }
      });
      res.send(user[0]);
    } catch(error) {
      next(error);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const user = await User.update(req.body, { 
        where: {
          googleId: req.params.id
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
