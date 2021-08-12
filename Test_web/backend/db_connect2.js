//My Personal Amazon RDS connection
//Please my new table into new Amazon RDS 
//If you make new RDS connection, please change all db information in this code

const mysql = require('mysql');

const db = mysql.createConnection({
    host: "ie-website.cwwpnvadcgqx.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "subdream",
    database: "ie_admin_db",
})

db.connect(function(error) {
    if(!error) {
        console.log("MySQL Database for Admin Website is connected ...");
      } else {
        console.log("Error connecting database ...");
      }
})

module.exports = db;