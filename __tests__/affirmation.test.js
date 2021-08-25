const database = require('../lib/utils/database');
const request = require('supertest');
const app = require('../lib/app');
const Affirmation = require('../lib/models/Affirmation.js');

describe.skip('affirmation testing', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('posts an affirmation', async () => {
    const affirmation = {
      text: 'You are great',
      category: 'wholesome',
    };
    
    const res =  await request(app).post('/api/v1/affirmations').send(affirmation);
    
    expect(res.body).toEqual({ id: 1, ...affirmation });
  });

  it('gets all affirmations by category', async () => {
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

    const res = await request(app).get('/api/v1/affirmations/wholesome');

    expect(res.body).toEqual([{ text: 'You are great' }, { text: 'You are awesome!' }]);
  });

  it('deletes an affirmation', async () => {
    const affirmation = {
      text: 'You are great',
      category: 'wholesome',
    };
    await Affirmation.create(affirmation);

    const res = await request(app).delete('/api/v1/affirmations/1');

    expect(res.body).toEqual({
      success: true
    });
  });


}); //<--- End parent code block
