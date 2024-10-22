import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import * as express from 'express';
import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const APP_PORT = +process.env.APP_PORT;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(`${APP_PORT}`);
}
bootstrap();
