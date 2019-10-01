// 加载依赖
const router = require('koa-router')();
const userctrl = require('../controllers/users/UserController');
const sourcectrl = require('../controllers/source/SourceController');
const smsctrl = require('../controllers/sms/SmsController');

router
  // 用户模块
  .post('/api/user/login', userctrl.login)
  .get('/api/user/info', userctrl.userInfo)

  // 数据模块
  .get('/api/source/all', sourcectrl.getAllData)
  .get('/api/source/query', sourcectrl.queryData)
  .get('/api/source/multiple', sourcectrl.queryMultiple)
  .get('/api/source/search', sourcectrl.searchByName)

  // 验证码模块
  .get('/api/sms/getSms', smsctrl.getSms)

module.exports = router;