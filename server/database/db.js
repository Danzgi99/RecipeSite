const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'myRecipe',
  password: '******'
});
connection.connect();
module.exports = connection;