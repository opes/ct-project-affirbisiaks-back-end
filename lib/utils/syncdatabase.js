const database = require('../utils/database.js');

const sync = async () => {
  try {
    await database.drop();
    await database.sync({ force: true });
    console.log('finished');
  } catch(error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

sync();
