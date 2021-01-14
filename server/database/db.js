const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'myRecipe',
  password: 'danzgiB'
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to Database.");
});
module.exports = connection;