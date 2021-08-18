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
      username: 'name',
      affirmations: [],
      preference: '',
      phoneNumber: ''
    };
    const res = await request(app).post('/api/v1/users').send(user);
    expect(res.body).toEqual({ id: 1, ...user });
  });
  it('gets a user by id', async () => {
    const user = await User.create({
      username: 'name',
      affirmations: [],
      preference: '',
      phoneNumber: ''
    });
    const res = await request(app).get(`/api/v1/users/${user.id}`);
    expect(res.body).toEqual({ id: 1, ...user.toJSON() });
  });
  it('updates a user by id', async () => {
    const user = await User.create({
      username: 'name',
      affirmations: [],
      preference: '',
      phoneNumber: ''
    });
    const newUser = {
      username: 'newName',
      affirmations: ['You\'re going to do great work today'],
      preference: 'wholesome',
      phoneNumber: '+19999999999'
    };
    const res = await request(app).patch(`/api/v1/users/${user.id}`).send(newUser);
    expect(res.body).toEqual({ id: 1, ...newUser });
  });
  it('deletes a user by id', async () => {
    const user = await User.create({
      username: 'name',
      affirmations: [],
      preference: '',
      phoneNumber: ''
    });
    const res = await request(app).delete(`/api/v1/users/${user.id}`);
    expect(res.body).toEqual({ success: true });
  });
});
