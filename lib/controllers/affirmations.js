const Router = require('express');
const Affirmation = require('../models/Affirmation.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const affirmation = await Affirmation.create(req.body);
      
      res.send(affirmation);

    } catch(error) {
      next(error); 
    }
  })

  .get('/all', async (req, res, next) => {
    try {
      const affirmations = await Affirmation.findAll({ 
        attributes: ['text'],
      }); 
          
      res.send(affirmations);

    } catch(error) {
      next(error);
    }
  })

  .get('/:category', async (req, res, next) => {
    try {
      const affirmations = await Affirmation.findAll({ 
        where: { category: req.params.category },
        attributes: ['text'],
      }); 
          
      res.send(affirmations);

    } catch(error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      await Affirmation.destroy({
        where: { id: req.params.id }
      });

      res.send({ success: true });

    } catch(error) {
      next(error);
    }
  });
