const database = require('../utils/database.js');



database.drop()
  .sync({ force: true })
  .then(() => console.log('finished')).catch((error) => console.error(error))
  .finally(() => process.exit());
