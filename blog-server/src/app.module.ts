import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { WebsiteModule } from './modules/website/website.module';
import { WebsiteController } from './controllers/website/website.controller';
import * as process from 'process';

@Module({
  imports: [
    WebsiteModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'blog',
      autoLoadEntities: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.MYSQL_HOST,
    //   port: 3306,
    //   username: process.env.MYSQL_USER,
    //   password: process.env.MYSQL_PWD,
    //   database: process.env.MYSQL_DB,
    //   autoLoadEntities: true,
    // }),
  ],
  controllers: [AppController, WebsiteController],
  providers: [AppService],
})
export class AppModule {}
