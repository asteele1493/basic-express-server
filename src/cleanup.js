require('dotenv').config();
const { sequelize } = require("./models");

async function cleanup () {
await sequelize.drop();
}

cleanup();