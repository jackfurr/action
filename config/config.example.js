/*

CREATE USER 'action'@'localhost' IDENTIFIED BY 'action';
GRANT ALL PRIVILEGES ON * . * TO 'action'@'localhost';
FLUSH PRIVILEGES;
CREATE DATABASE action;

*/

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

var config = {
    root: rootPath,
    app: {
      name: 'action'
    },
    port: 3000,
    db: {
        write: {
            host: 'localhost',
            user: '',
            password: '',
            database: ''
        },
        read: {
            host: 'localhost',
            user: '',
            password: '',
            database: ''
        }
    },
    memory_usage_ms: 60000
};

module.exports = config;
