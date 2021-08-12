//Subdream Isekai Eternal Amazon RDS connection

const mysql = require('mysql');

const db = mysql.createConnection({
    host: "ie-database.cxgwm6w72ll9.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "subdream",
    database: "iegame_db",
})

db.connect(function(error) {
    if(!error) {
        console.log("MySQL Database for game data is connected ...");
      } else {
        console.log("Error connecting database ...");
      }
})

module.exports = db;