const mysql = require('mysql2');
 
const pool = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'ev_cars',
    debug    :  false
}).promise();

module.exports = {pool};