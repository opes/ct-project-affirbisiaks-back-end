const Deck = require('card-deck');
const Affirmation = require('../models/Affirmation.js');

async function affirmationHandler(userObj) {
  const userObject = userObj;

  // takes preference from user userObj
  const preference = userObject.preference;

  // pulls in affirmations that match preference
  let affirmations;
  if(preference === '') {
    affirmations = await Affirmation.findAll({
      attributes: ['text'],
    });
  } else {
    affirmations = await Affirmation.findAll({
      where: { category: preference },
      attributes: ['text'],
    });
  }
  const mungedAffirmations = affirmations.map((single) => {
    return single.text;
  });

  // Uses card-deck to select some random affirmations (LIMITER)
  const affirmNum = mungedAffirmations.length;
  const allAffirmationsDeck = new Deck(mungedAffirmations);
  allAffirmationsDeck.shuffle();
  let limitedAffirmations;
  if(affirmNum <= 5) {
    limitedAffirmations = allAffirmationsDeck.draw(affirmNum);
  } else if(affirmNum > 5) {
    limitedAffirmations = allAffirmationsDeck.draw(5);
  }
  // injects matching affirmations into userObj
  userObject.affirmations = limitedAffirmations;

  return userObject;
}

module.exports = affirmationHandler;
