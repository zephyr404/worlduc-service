const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const apiRouter = require('./router/index');
var cors = require('koa2-cors');
const fs = require('fs');

const app = new Koa();
app.use(cors());

// 首页
const index = router.get('/', ctx => {
  ctx.response.body = 'its work';
}).routes();

app.use(index);
app.use(bodyParser());
app.use(apiRouter.routes());

// 读取login页面
const login = router.get('/login', ctx => {
  ctx.response.body = 'hello world';
}).routes();

app.use(login);

app.listen(3000);