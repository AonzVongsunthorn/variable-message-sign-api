import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  DatabaseTypes,
  NODE_ENV_CONF,
  DB_DATABASE_CONF,
  DB_HOST_CONF,
  DB_LOGGING_CONF,
  DB_PASSWORD_CONF,
  DB_PORT_CONF,
  DB_TYPE_CONF,
  DB_USERNAME_CONF,
} from '../constants';
import { generateTypeOrmModuleOptions } from './database.util';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService): TypeOrmModuleOptions {
        return generateTypeOrmModuleOptions(
          <DatabaseTypes>configService.get<string>(DB_TYPE_CONF),
          configService.get<string>(DB_HOST_CONF),
          configService.get<number>(DB_PORT_CONF),
          configService.get<string>(DB_USERNAME_CONF),
          configService.get<string>(DB_PASSWORD_CONF),
          configService.get<string>(DB_DATABASE_CONF),
          configService.get<boolean>(DB_LOGGING_CONF),
          configService.get<string>(NODE_ENV_CONF),
        );
      },
    }),
  ],
})
export class DatabasesModule {}
