/* eslint-disable no-console */
const app = require('./server');

const ds = app.dataSources.db;

const models = [
  'MyUser',
  'Task'
];

const createTables = models => {
  // return a new promise to be resolved
  return new Promise((resolve, reject) => {
    // re create the tables without lost the data
    ds.autoupdate(models, (err) => {
      const name = ds.adapter.name;

      // get the error
      if (err) {
        console.log('error', err);
        return reject(err);
      }

      console.log(`tables created with autoupdate on ${name}!`);
      return resolve();
    });
  });
};

const migrate = async () => {
  try {
    await createTables(models);
  } catch (error) {
    throw error;
  }

  ds.disconnect();
};

migrate()
  .then(() => console.log('MIGRATION DONE!', new Date().toTimeString()))
  .catch(err => console.log('error', err));
