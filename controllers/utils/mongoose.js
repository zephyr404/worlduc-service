var mongoose = require('mongoose');
mongoose.connect('mongodb://47.102.154.38:27017/test', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("数据库就绪!");
});
