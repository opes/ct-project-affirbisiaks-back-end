const database = require('../lib/utils/database');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');
const Affirmation = require('../lib/models/Affirmation');
const UserService = require('../lib/services/UserService');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));


describe('back-end routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates a user account with a preference', async () => {
    const user = {
      name: 'name',
      affirmations: [],
      preference: 'wholesome',
      phoneNumber: '+12365478901',
      googleId: '1234'
    };

    const affirmation1 = {
      text: 'You are great',
      category: 'wholesome',
    };
    const affirmation2 = {
      text: 'You are awesome!',
      category: 'wholesome',
    };
    const affirmation3 = {
      text: 'You are great at stuffs and things!',
      category: 'motivational',
    };
    await Affirmation.bulkCreate([affirmation1, affirmation2, affirmation3]);

    const res = await request(app).post('/api/v1/users').send(user);
    expect(res.body).toEqual({ id: res.body.id, ...user, affirmations: [affirmation1.text, affirmation2.text] });
  });

  it('creates a user account without a preference', async () => {
    const user = {
      name: 'name',
      affirmations: [],
      preference: '',
      phoneNumber: '+12365478901',
      googleId: '1234'
    };

    const affirmation1 = {
      text: 'You are great',
      category: 'wholesome',
    };
    const affirmation2 = {
      text: 'You are awesome!',
      category: 'wholesome',
    };
    const affirmation3 = {
      text: 'You are great at stuffs and things!',
      category: 'motivational',
    };
    await Affirmation.bulkCreate([affirmation1, affirmation2, affirmation3]);

    const res = await request(app).post('/api/v1/users').send(user);
    expect(res.body).toEqual({ id: res.body.id, ...user, affirmations: [affirmation1.text, affirmation2.text, affirmation3.text] });
  });

  it('gets a user by googleId', async () => {
    const user = await User.create({
      name: 'name',
      affirmations: [],
      preference: '',
      phoneNumber: '',
      googleId: '1234'
    });
    const res = await request(app).get(`/api/v1/users/${user.googleId}`);
    expect(res.body).toEqual({ id: 1, ...user.toJSON() });
  });

  it('sends a user their affirmations', async () => {
    const affirmation1 = {
      text: 'You are great',
      category: 'wholesome',
    };
    const affirmation2 = {
      text: 'You are awesome!',
      category: 'wholesome',
    };
    const affirmation3 = {
      text: 'You are great at stuffs and things!',
      category: 'motivational',
    };
    await Affirmation.bulkCreate([affirmation1, affirmation2, affirmation3]);

    const user = await UserService.createAffirmations({
      name: 'name',
      affirmations: [],
      preference: '',
      phoneNumber: '+17755278873',
      googleId: '1234'
    });
    
    const formattedUser = await request(app).get(`/api/v1/users/${user.googleId}`);

    const res = await request(app).get('/api/v1/users/send').send(formattedUser.body);
    expect(res.body).toEqual({ message: 'All done!' });
  });

  it('updates a user by id', async () => {
    const user = await User.create({
      name: 'name',
      affirmations: [],
      preference: '',
      phoneNumber: '',
      googleId: '1234'
    });
    const newUser = {
      name: 'newName',
      affirmations: ['You\'re going to do great work today'],
      preference: 'wholesome',
      phoneNumber: '+19999999999'
    };
    const res = await request(app).patch(`/api/v1/users/${user.googleId}`).send(newUser);
    expect(res.body).toEqual({ id: 1, ...newUser, googleId: '1234' });
  });
  it('deletes a user by id', async () => {
    const user = await User.create({
      name: 'name',
      affirmations: [],
      preference: '',
      phoneNumber: '',
      googleId: '1234'
    });
    const res = await request(app).delete(`/api/v1/users/${user.id}`);
    expect(res.body).toEqual({ success: true });
  });
});
