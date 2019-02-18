const mysql = require('mysql')
const pool = mysql.createPool({
    host            : process.env.DATABASE_HOST,
    port            : process.env.MYSQL_PORT,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
    database        : process.env.MYSQL_DATABASE
})

module.exports = pool


/*CREATE USER 'aghiles'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'aghiles'@'%';
FLUSH PRIVILEGES;
CREATE USER 'aghiles'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'aghiles'@'%';
FLUSH PRIVILEGES;
*/