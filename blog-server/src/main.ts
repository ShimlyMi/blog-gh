import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const APP_PORT = +process.env.APP_PORT;
  // const config = new DocumentBuilder()
  //   .setTitle('MINA WebAPI')
  //   .setDescription('米娜的API')
  //   .setVersion('1.0.0')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);
  app.useStaticAssets(join(__dirname, '/assets'), {
    prefix: '/static/', //设置虚拟前缀路径
    maxAge: 1000 * 60, //设置缓存时间
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(`${APP_PORT}`);
}
bootstrap();
