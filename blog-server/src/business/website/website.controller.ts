import { Controller, Get } from '@nestjs/common';
import { WebsiteService } from './website.service';

// import { CreateWebsiteConfigDto } from './dto/create-website.dto';

@Controller('website')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  // @Post()
  // create(@Body() createWebsiteConfigDto: CreateWebsiteConfigDto) {
  //   return this.websiteService.create(createWebsiteConfigDto);
  // }

  @Get()
  findAll() {
    return this.websiteService.findAll();
  }
}
