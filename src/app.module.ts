import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabasesModule } from './database/database.module';
import { ApiModule } from './apis/api.module';
import {join} from "path";
import { ServeStaticModule } from '@nestjs/serve-static';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabasesModule,
    ApiModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
