var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test",
});

connection.connect();

var sql = "SELECT * FROM iconlist";
connection.query(sql, function (err, rows, fields) {
  if (err) console.log(err);
  console.log("rows", rows); //row는 배열이다.
  console.log("fields", fields); //fields는 컬럼을 의미한다.
});

connection.end(); //접속이 끊긴다.
