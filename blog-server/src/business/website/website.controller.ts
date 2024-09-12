import { Controller, Get } from '@nestjs/common';
import { WebsiteService } from './website.service';
import {Public} from "../auth/constants";

// import { CreateWebsiteConfigDto } from './dto/create-website.dto';

@Controller('website')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  // @Post()
  // create(@Body() createWebsiteConfigDto: CreateWebsiteConfigDto) {
  //   return this.websiteService.create(createWebsiteConfigDto);
  // }

  @Public()
  @Get()
  findAll() {
    return this.websiteService.findAll();
  }
}
