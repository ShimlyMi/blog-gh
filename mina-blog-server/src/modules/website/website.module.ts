import { Module } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { WebsiteController } from './website.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsiteEntity } from '../../entity/websiteEntity/website.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WebsiteEntity])],
  controllers: [WebsiteController],
  providers: [WebsiteService],
})
export class WebsiteModule {}
