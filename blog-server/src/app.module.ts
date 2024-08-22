import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// import * as Joi from 'joi';
// import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import {validate} from "./env.validation";
import { WebsiteModule } from './modules/website/website.module';
import { UserModule } from './modules/user/user.module';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PWD,
      database: process.env.MYSQL_DB,
      synchronize: true,
      autoLoadEntities: true,
    }),

    WebsiteModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
