import * as process from 'process';
// import { DatabaseConfig } from '../database/db.config';

export default () => ({
  port: parseInt(process.env.APP_PORT) || 8888,
  database: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT || 3306,
    name: process.env.MYSQL_DB,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
  },
});
