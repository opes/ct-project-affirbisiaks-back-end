const database = require('../lib/utils/database');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');

describe('back-end routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates a user account', async () => {
    const user = {
      name: 'name',
      affirmations: [],
      preference: '',
      phoneNumber: '',
      googleId: '1234'
    };
    const res = await request(app).post('/api/v1/users').send(user);
    expect(res.body).toEqual({ id: 1, ...user });
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
