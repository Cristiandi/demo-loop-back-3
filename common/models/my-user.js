const timestamp = require('../../server/mixins/timestamp');

module.exports = MyUser => {
  timestamp(MyUser, {});
};
