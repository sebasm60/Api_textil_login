const mysql = require('mysql2');
require('dotenv').config();

const conection_mysql = mysql.createConnection({
    host: "bjkuzzoj0pxl0teng5am-mysql.services.clever-cloud.com",
    user: "ucozmb4rjyllvt0o",
    password: "tSLQfSUAarCLNqpUhNjz",
    database: "bjkuzzoj0pxl0teng5am",
    port: 3306,
});

module.exports = {
    cnn_mysql: conection_mysql
};