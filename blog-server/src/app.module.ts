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

// const envPath = `.env.${process.env.NODE_ENV || 'development'}`;
@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: envPath,
    //   load: [() => dotenv.config({ path: '.env' })],
    //   // validate,
    //   validationSchema: Joi.object({
    //     MODE_ENV: Joi.string().valid('development').default('development'),
    //     APP_PORT: Joi.number().default(8888),
    //     MYSQL_HOST: Joi.string().required(),
    //     MYSQL_PORT: Joi.number().default(3306),
    //     MYSQL_USER: Joi.string().required(),
    //     MYSQL_PWD: Joi.string().required(),
    //     MYSQL_DB: Joi.string().required(),
    //     JWT_SECRET: Joi.string().required(),
    //     JWT_TOKEN_AUDIENCE: Joi.string().required(),
    //     JWT_TOKEN_ISSUER: Joi.string().required(),
    //     JWT_ACCESS_TOKEN_TTL: Joi.number().default(3600),
    //   }),
    //   validationOptions: {
    //     // 这里加
    //     allowUnknown: false,
    //     abortEarly: true,
    //   },
    // }),
    // TypeOrmModule.forRootAsync({
    //   useFactory: () => ({
    //     type: 'mysql',
    //     host: process.env.MYSQL_HOST,
    //     port: +process.env.MYSQL_PORT,
    //     username: process.env.MYSQL_USER,
    //     password: process.env.MYSQL_PWD,
    //     database: process.env.MYSQL_DB,
    //     synchronize: true,
    //     // cache: true, // 暂启缓存
    //     autoLoadEntities: true,
    //   }),
    // }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'blog',
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
