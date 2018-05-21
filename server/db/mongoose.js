var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
 var uri='mongodb://localhost:27017/todos';

mongoose.connect(uri, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
 });



module.exports = {mongoose};