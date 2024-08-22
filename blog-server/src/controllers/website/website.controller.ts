import { Body, Controller, Get, Post } from '@nestjs/common';
import { WebsiteService } from '../../modules/website/website.service';
import { CreateWebsiteConfigDto } from '../../modules/website/dto/create-website-config.dto';

@Controller('website')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Post('/create')
  create(@Body() createWebsiteConfigDto: CreateWebsiteConfigDto) {
    return this.websiteService.create(createWebsiteConfigDto);
  }

  @Get()
  findAll() {
    return this.websiteService.findAll();
  }
}
