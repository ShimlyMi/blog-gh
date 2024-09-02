import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
// import Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { WebsiteModule } from './business/website/website.module';
import { CategoryModule } from './business/category/category.module';
import { TagModule } from './business/tag/tag.module';
import { ArticleModule } from './business/article/article.module';
import { UploadModule } from './business/upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './business/user/user.module';
import { TalkModule } from './talk/talk.module';
import { TalkModule } from './business/talk/talk.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development','.env'],
      // validationSchema: Joi.object({
      //   UPLOAD_FILES_DESTINATION: Joi.string().required(),
      // }),
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
    CategoryModule,
    TagModule,
    ArticleModule,
    AuthModule,
    UserModule,
    UploadModule,
    TalkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
