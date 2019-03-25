const enviroment = require('./utils/enviroment');

module.exports = {
  db: {
    connector: 'mysql',
    hostname: enviroment.DB_HOST,
    port: enviroment.DB_PORT,
    user: enviroment.DB_USER,
    password: enviroment.DB_PASSWORD,
    database: enviroment.DB_NAME
  }
};
