// const Affirmation = require('../models/Affirmation.js');
const User = require('../models/User');
const affirmationHandler = require('../utils/affirmationHandler.js');
const { sendSms } = require('../utils/twilio.js');

class UserService {
  static async createAffirmations(userObj) {
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

    await sendSms(
      userObj.phoneNumber,
      'You are on track to receive your affirmations! Expect a wonderful text in the next two days :)'
    );

    const oneDay = 1000 * 60 * 60 * 24;

    (function smsLoop(i) {
      setTimeout(async () => {
        await sendSms(userObj.phoneNumber, `${userObj.affirmations[i - 1]}`);
        if(--i) smsLoop(i);
      }, oneDay * 2);
    })(userObj.affirmations.length);

    return { message: 'All done!' };
  }

  static async updateAffirmations(userObj) {

    const userObject = await affirmationHandler(userObj);

    const updatedUser = await User.update(userObject, {
      where: {
        googleId: userObject.googleId,
      },
      returning: true,
    });

    await sendSms(
      updatedUser[1][0].phoneNumber,
      'You have successfully updated your information!'
    );

    return updatedUser;
  }
}

module.exports = UserService;
