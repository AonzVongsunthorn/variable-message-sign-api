import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import ormConfig = require('../../migrations/ormconfig');
import { DatabaseTypes } from '@/constants';

export function generateTypeOrmModuleOptions(
  type: DatabaseTypes,
  host: string,
  port: number,
  username: string,
  password: string,
  database: string,
  logging: boolean,
  env: string,
): TypeOrmModuleOptions {
  const config: TypeOrmModuleOptions = {
    type,
    host,
    port,
    username,
    password,
    database,
    entities: [],
    logging,
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
  };
  const testConfig: TypeOrmModuleOptions = env === 'TEST' ? <TypeOrmModuleOptions>ormConfig : {};
  return Object.assign({}, testConfig, { migrationsRun: true }, config);
}
