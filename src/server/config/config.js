require('dotenv').config();
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const host = process.env.HOST
const node_env = process.env.NODE_ENV;
const config = {
  development: {
    username,
    password,
    database,
    host
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};
module.exports = config[node_env]