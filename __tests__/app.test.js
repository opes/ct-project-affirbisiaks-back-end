const database = require('../lib/utils/database');
const request = require('supertest');
const app = require('../lib/app');

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
});
