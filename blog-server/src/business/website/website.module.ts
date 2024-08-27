import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsiteService } from './website.service';
import { Website } from './entities/website.entity';
import { WebsiteController } from './website.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Website])],
  controllers: [WebsiteController],
  providers: [WebsiteService],
})
export class WebsiteModule {}
