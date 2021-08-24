const database = require('../utils/database.js');



database.sync({ force: true })
  .then(() => console.log('finished'))
  .finally(() => process.exit());
