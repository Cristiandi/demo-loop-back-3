const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

let envPath;

// validate the NODE_ENV
switch (process.env.NODE_ENV) {
case 'development':
  envPath = path.resolve(__dirname, '../../.env.development');
  break;
default:
  envPath = path.resolve(__dirname, '../../.env.local');
  break;
};

dotenv.config({ path: envPath });

const enviroment = {
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT
};

module.exports = enviroment;
