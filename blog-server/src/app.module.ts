import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsiteModule } from './modules/website/website.module';
import { WebsiteController } from './controllers/website/website.controller';
import { WebsiteEntity } from "./entitis/website/website.entity";

@Module({
  imports: [
    WebsiteModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'blog',
      entities: [WebsiteEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController, WebsiteController],
  providers: [AppService],
})
export class AppModule {}
