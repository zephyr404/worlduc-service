const db = require('../db/index');

class UserController {
  // 用户登录
  async login(ctx, next) {
    // 获取请求提交的数据
    let phone = ctx.request.body.phone || '';
    let pwd = ctx.request.body.pwd || '';

    if (phone == undefined || phone == '' || pwd == undefined || pwd == '') {
      ctx.body = 'Tips[empty]';
    } else {
      // 后台交互
      let sql = `SELECT * FROM users WHERE phone="${phone}" and pwd="${pwd}"`;  //, value = [uid, pwd];
      await db.query(sql).then(res => {  // , value
        if (res && res.length > 0) {
          let data = { res: res, token: 'zephyr1' };
          ctx.body = data;
        } else {
          ctx.body = 'Tips[no res]';
        }
      }).catch(e => {
        ctx.body = 'Tips[error]';
      })
    }

  }

  // 用户信息
  async userInfo(ctx, next) {
    let uid = ctx.query.uid;

    if (uid == undefined || uid == '') {
      ctx.body = 'Tips[empty]';
    } else {
      // 后台交互
      let sql = `SELECT * FROM users WHERE uid="${uid}"`;  //, value = [uid, pwd];
      await db.query(sql).then(res => {  // , value
        if (res && res.length > 0) {
          let data = res;
          ctx.body = {
            status: 'ok',
            data: data
          };
        } else {
          ctx.body = 'Tips[no res]';
        }
      }).catch(e => {
        ctx.body = 'Tips[error]';
      })
    }

  }
}

module.exports = new UserController();