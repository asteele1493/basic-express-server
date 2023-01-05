require('dotenv').config();

const { sequelize } = require('./src/models');
const { server } = require('./src/server.js');

const port = process.env.PORT || 3000;
server.listen(port, async () => {
  await sequelize.drop();
  await sequelize.sync();
  console.log(`Listening on ${port}`);
})

