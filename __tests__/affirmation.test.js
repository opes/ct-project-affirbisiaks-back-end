const database = require('../lib/utils/database');
const request = require('supertest');
const app = require('../lib/app');
const Affirmation = require('../lib/models/Affirmation.js');

describe('affirmation testing', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('posts an affirmation', async () => {
    const affirmation = {
        text: 'You are great',
        category: 'wholesome',
    }
    
    const res =  await request(app).post('/api/v1/affirmation').send(affirmation);
    
    expect(res.body).toEqual({ id: 1, ...affirmation });
  })


}); //<--- End parent code block