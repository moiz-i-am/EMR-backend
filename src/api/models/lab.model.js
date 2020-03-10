const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');

const labSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    maxlength: 128,
  },
  location: {
    type: String,
    required: true,
  },

});

labSchema.statics = {

  /**
     * List users in descending order of 'createdAt' timestamp.
     *
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<User[]>}
     */
  list({
    page = 1, perPage = 30, name, location,
  }) {
    const options = omitBy({ name, location }, isNil);
    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

};

module.exports = mongoose.model('Lab', labSchema);
