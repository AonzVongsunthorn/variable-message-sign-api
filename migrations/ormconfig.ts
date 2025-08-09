import dotenv = require('dotenv');
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';
import { DatabaseTypes, DB_DATABASE_CONF, DB_HOST_CONF, DB_PASSWORD_CONF, DB_PORT_CONF, DB_TYPE_CONF, DB_USERNAME_CONF } from '../src/constants';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'local';
}
dotenv.config({
  path: `.env`,
});

let dataSource: DataSource;
dataSource = new DataSource({
  host: process.env[DB_HOST_CONF],
  type: <DatabaseTypes>process.env[DB_TYPE_CONF],
  port: +process.env[DB_PORT_CONF],
  username: process.env[DB_USERNAME_CONF],
  password: process.env[DB_PASSWORD_CONF],
  database: process.env[DB_DATABASE_CONF],
  entities: [`${__dirname}/src/api/**/**.entity{.ts,.js}`],
  synchronize: false,
  migrations: ['migrations/schemas/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
});

export default dataSource;
