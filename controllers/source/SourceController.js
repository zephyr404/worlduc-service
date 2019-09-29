const db = require('../db/index');

class SourceController {
  // 用户登录
  async getAllData(ctx, next) {
    let sql = `SELECT * FROM user_copy1`;
    await db.query(sql).then(res => {
      if (res && res.length > 0) {
        ctx.body = res;
      } else {
        ctx.body = 'Tips[no res]';
      }
    }).catch(e => {
      ctx.body = 'Tips[error]';
    })
  }

  // 用户信息
  async queryData(ctx, next) {
    let b = ctx.query.b;
    let e = ctx.query.e;

    // 后台交互
    let sql = `SELECT * FROM user_copy1 LIMIT ${b - 1}, ${e - b + 1};`;
    await db.query(sql).then(res => {
      if (res && res.length > 0) {
        let data = { res: res, ok: 1 };
        ctx.body = data;
      } else {
        ctx.body = 'Tips[no res]';
      }
    }).catch(e => {
      ctx.body = 'Tips[error]';
    })
  }
}

module.exports = new SourceController();