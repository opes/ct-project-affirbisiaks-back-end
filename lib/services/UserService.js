const Affirmation = require('../models/Affirmation.js');
const User = require('../models/User');
const { sendSms } = require('../utils/twilio.js');
const Deck = require('card-deck');
// const { sendSms } = require('../utils/twilio.js');

class UserService {
  static async createAffirmations(userObj) {
    // userObj:
    // {
    //     name: 'name',
    //     affirmations: [],
    //     preference: '',
    //     phoneNumber: '123654789',
    //     googleId: '1234'
    // }
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
      limitedAffirmations = allAffirmationsDeck.draw(affirmNum);
    }
    // injects matching affirmations into userObj
    userObject.affirmations = limitedAffirmations;

    // passes updated userObj into User.create() and returns outcome
    const updatedUser = await User.create(userObject);

    await sendSms(
      updatedUser.phoneNumber,
      'You have started your affirbisiak journey!'
    );

    return updatedUser;
  }

  static async sendAffirmation(userObj) {

    const oneDay = 1000 * 60 * 60 * 24;

    (function smsLoop(i) {
      setTimeout(async () => {
        await sendSms(userObj.phoneNumber, `${userObj.affirmations[i - 1]}`);
        if(--i) smsLoop(i);
      }, oneDay);
    })(userObj.affirmations.length);

    return { message: 'All done!' };
  }
}

module.exports = UserService;
