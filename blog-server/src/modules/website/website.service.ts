import { Injectable, Query } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Website } from '../../entitis/website/website.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWebsiteConfigDto } from './dto/create-website-config.dto';

@Injectable()
export class WebsiteService {
  constructor(
    @InjectRepository(Website)
    private readonly website: Repository<Website>,
  ) {}

  create(createWebsiteConfigDto: CreateWebsiteConfigDto) {
    const data = new Website();
    data.blogName = createWebsiteConfigDto.blogName;
    data.blogAvatar = createWebsiteConfigDto.blogAvatar;
    data.avatarBg = createWebsiteConfigDto.avatarBg;
    data.blogNotice = createWebsiteConfigDto.blogNotice;
    data.personalSignature = createWebsiteConfigDto.personalSignature;
    data.viewTimes = createWebsiteConfigDto.viewTimes;
  }

  async findAll(@Query() query: { current: number; size: number }) {
    const data = await this.website.find({
      order: { id: 'DESC' },
      skip: (query.current - 1) * query.size,
      take: query.size,
    });
    return {
      data,
    };
  }
}
