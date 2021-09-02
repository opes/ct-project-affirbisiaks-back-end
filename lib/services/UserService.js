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

    // You might want to use background jobs to handle recurring SMS
    // If your server restarts, this timeout will get killed.
    // With a background job, the messages would be sent from a separate
    // process, so your server could be down but affirmations could still
    // be sent.
    //
    // A popular background jobs library is Bull:
    // https://github.com/OptimalBits/bull/
    // https://devcenter.heroku.com/articles/node-redis-workers
    (function smsLoop(i) {
      setTimeout(async () => {
        await sendSms(userObj.phoneNumber, `${userObj.affirmations[i - 1]}`);
        if (--i) smsLoop(i);
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
