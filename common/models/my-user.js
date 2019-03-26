const timestamp = require('../../server/mixins/timestamp');

module.exports = MyUser => {
  timestamp(MyUser, {});

  MyUser.greet = req => {
    const { name } = req.query;
    if (!name) {
      const err = new Error('name is required in query paramameters');
      err.status = 422;
      throw err;
    }

    return Promise.resolve(`Greetings... ${name}!`);
  };
  MyUser.remoteMethod('greet', {
    accepts: {
      arg: 'req',
      type: 'object',
      http: {
        source: 'req'
      }
    },
    returns: {
      arg: 'greeting',
      type: 'string',
      root: true
    },
    http: {
      path: '/greet',
      verb: 'get',
      status: 200,
      errorStatus: 500
    },
    description: 'Greet someone.'
  });
};
