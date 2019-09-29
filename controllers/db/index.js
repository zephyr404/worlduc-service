var mysql = require('mysql');

let config = {
  host: 'gz-cdb-pykrev06.sql.tencentcdb.com',
  user: 'root',
  password: 'ChenShuai970915',
  database: 'spider',
  port: 62901,
  multipleStatements: true  //允许多条sql同时执行
};

let pool = mysql.createPool(config);
let query = (sql) => {  // , values
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        reject(err)
      } else {
        connection.query(sql, (err, rows) => {  // , values
          if (err) {
            console.log(err);
            reject(err)
          } else {
            console.log(rows);
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
};
module.exports = {
  query
}
