const app = require('./lib/app');
const db = require('./lib/utils/database');

const PORT = process.env.PORT || 7890;
db.sync().then(() => {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Started on ${PORT}`);
  });
});

process.on('exit', () => {
  console.log('Goodbye!');
});
