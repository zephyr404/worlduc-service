const db = require('../db/index');

class SourceController {
  // 查询所有数据
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

  // 通过id查询数据
  async queryData(ctx, next) {
    let i = ctx.query.id;

    let sql = `SELECT u_id FROM user_copy1 WHERE u_id = "${i}";`;
    console.log(sql);

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

  // 查询指定索引的数据
  async queryMultiple(ctx, next) {
    let b = ctx.query.b;
    let e = ctx.query.e;

    let sql = `SELECT * FROM user_copy1 LIMIT ${b - 1}, ${e - b + 1};`

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