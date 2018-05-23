var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
 var uri=process.env.MONGODB_URI;

mongoose.connect(uri, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
 });



module.exports = {mongoose};