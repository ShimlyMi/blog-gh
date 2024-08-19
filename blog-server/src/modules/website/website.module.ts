import { Module } from '@nestjs/common';
import { WebsiteService } from './website.service';

@Module({
  providers: [WebsiteService]
})
export class WebsiteModule {}
