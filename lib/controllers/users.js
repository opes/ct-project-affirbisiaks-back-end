const Router = require('express');
const User = require('../models/User.js');
const UserService = require('../services/UserService.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.createAffirmations(req.body);
      res.send(user);
    } catch (error) {
      next(error);
    }
  })
  .get('/send/:id', async (req, res, next) => {
    try {
      const user = await User.findAll({
        where: { googleId: req.params.id },
      });

      const response = await UserService.sendAffirmation(user[0].dataValues);

      res.send(response);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const user = await User.findAll({
        where: {
          googleId: req.params.id,
        },
      });
      res.send(user[0]);
    } catch (error) {
      next(error);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const user = await UserService.updateAffirmations(req.body);

      res.send(user[1][0]);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send({ success: true });
    } catch (error) {
      next(error);
    }
  });
