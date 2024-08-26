import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// import * as Joi from 'joi';
// import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsiteModule } from './modules/website/website.module';
import { UserModule } from './modules/user/user.module';
import * as process from 'process';
import { CategoryModule } from './modules/category/category.module';
import { TagModule } from './modules/tag/tag.module';
import { UploadModule } from './controllers/upload/upload.module';
import { UploadController } from './controllers/upload/upload.controller';
import { UploadModule } from './modules/upload/upload.module';
import Joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'],
      validationSchema: Joi.object({
        UPLOAD_FILES_DESTINATION: Joi.string().required()
      })
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PWD,
      database: process.env.MYSQL_DB,
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    WebsiteModule,
    UserModule,
    CategoryModule,
    TagModule,
    UploadModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule {}
