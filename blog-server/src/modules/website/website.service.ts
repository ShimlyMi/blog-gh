import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Website } from '../../entitis/website/website.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreateWebsiteConfigDto } from './dto/create-website-config.dto';

@Injectable()
export class WebsiteService {
  constructor(
    @InjectRepository(Website)
    private readonly website: Repository<Website>,
  ) {}

  // create(createWebsiteConfigDto: CreateWebsiteConfigDto) {
  //   const data = new Website();
  //   data.blogName = createWebsiteConfigDto.blogName;
  //   data.blogAvatar = createWebsiteConfigDto.blogAvatar;
  //   data.avatarBg = createWebsiteConfigDto.avatarBg;
  //   data.blogNotice = createWebsiteConfigDto.blogNotice;
  //   data.personalSignature = createWebsiteConfigDto.personalSignature;
  //   data.viewTimes = createWebsiteConfigDto.viewTimes;
  //
  //   return this.website.save(data);
  // }

  async findAll() {
    const data = await this.website.find({
      select: [
        'blogName',
        'blogAvatar',
        'avatarBg',
        'blogNotice',
        'personalSignature',
        'viewTimes',
      ],
    });

    return {
      code: 200,
      message: 'Success',
      data: data.length ? data[0] : false,
    };
    // return data.length ? data[0] : data;
    // return res.length ? res[0] : false;
  }
}
