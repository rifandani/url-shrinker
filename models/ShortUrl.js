const mongoose = require('mongoose'); // Erase if already required
const shortId = require('shortid'); // Erase if already required

// Declare the Schema of the Mongo model
var ShortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

//Export the model
module.exports = mongoose.model('ShortUrl', ShortUrlSchema);
