import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsiteService } from './website.service';
import { Website } from '../../entities/website/website.entity';
import { WebsiteController } from '../../controllers/website/website.controller';
// import { websiteProviders } from '../../common/providers/website.providers';

@Module({
  imports: [TypeOrmModule.forFeature([Website])],
  controllers: [WebsiteController],
  providers: [WebsiteService],
})
export class WebsiteModule {}
