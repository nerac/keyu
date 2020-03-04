const fp = require('./fp');
const concurrency = require('./concurrency');
const collections = require('./collections');
const logic = require('./logic');
const types = require('./types');
const io = require('./io');
const conversions = require('./conversions');

module.exports = {
  ...fp,
  ...concurrency,
  ...collections,
  ...logic,
  ...types,
  ...io,
  ...conversions
};
