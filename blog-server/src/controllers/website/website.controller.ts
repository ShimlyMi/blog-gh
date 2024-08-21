import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WebsiteService } from '../../modules/website/website.service';
import { CreateWebsiteConfigDto } from '../../modules/website/dto/create-website-config.dto';

@Controller('website')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Post()
  create(@Body() createWebsiteConfigDto: CreateWebsiteConfigDto) {
    return this.websiteService.create(createWebsiteConfigDto);
  }

  @Get()
  findAll(@Query() query: { current: number; size: number }) {
    try {
      return this.websiteService.findAll(query);
    } catch (error) {

    }
  }
}
