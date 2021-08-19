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