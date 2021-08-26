// const Affirmation = require('../models/Affirmation.js');
const User = require('../models/User');
const affirmationHandler = require('../utils/affirmationHandler.js');
const { sendSms } = require('../utils/twilio.js');

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
    const userObject = await affirmationHandler(userObj);

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
