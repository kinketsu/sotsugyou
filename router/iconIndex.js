var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",

  user: "root",

  password: "
  autoset",

  database: "icon-test",
});

con.connect(function (err) {
  if (err) throw err;

  console.log("Connected!");

  var sql =
    "INSERT INTO icon_test_lee (id, iconName, iconType) VALUES ('homzzang', '10')";

  con.query(sql, function (err, result) {
    if (err) throw err;

    console.log("1 record inserted");
  });
});
