import { Injectable, UseInterceptors } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Website } from '../../entities/website/website.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseInterceptor } from '../../common/interceptors/response.interceptor';
import { ResultData } from '../../common/utils/result';
import { ErrorCode } from '../../common/constants/constants';

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

  @UseInterceptors(ResponseInterceptor)
  async findAll() {
    try {
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

      return ResultData.messageSuccess(
        data.length ? data[0] : false,
        '查询成功',
      );
    } catch (error) {
      console.error(error);
      return ResultData.messageFail(ErrorCode.CONFIG, '查询失败', '');
    }
  }
}
