const moment = require('moment-timezone');
const enviroment = require('../utils/enviroment');

/**
 * mixing to add the createdAt and updatedAt fields
 *
 * @param {PersitedModel} model model
 * @param {object} options object to define the options
 */
module.exports = (model, options) => {
  // Model is the model class
  // options is an object containing the config properties from model definition
  model.defineProperty('createdAt', { type: Date, required: options.createdAtRequired });
  model.defineProperty('updatedAt', { type: Date, required: options.updatedAtRequired });

  model.observe('before save', ctx => {
    const currentDate = moment().tz(enviroment.TIME_ZONE).format();
    // Observe any insert/update event on Model
    if (ctx.instance) {
      if (ctx.isNewInstance) {
        ctx.instance.createdAt = currentDate;
        ctx.instance.updatedAt = currentDate;
      } else {
        ctx.instance.updatedAt = currentDate;
      }
    } else if (ctx.currentInstance) {
      ctx.data.updatedAt = currentDate;
    } else {
      ctx.data.createdAt = currentDate;
      ctx.data.updatedAt = currentDate;
    }
    return Promise.resolve();
  });
};
