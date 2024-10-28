import { Injectable } from '@nestjs/common';
import { UpdateTalkPhotoDto } from './dto/update-talk-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TalkPhoto } from './entities/talk-photo.entity';
import { Repository } from 'typeorm';
import { ResultData } from '../../common/utils/result';
import { ErrorCode } from '../../common/constants/constants';
import { CreateTalkPhotoDto } from './dto/create-talk-photo.dto';

@Injectable()
export class TalkPhotosService {
  constructor(
    @InjectRepository(TalkPhoto)
    private talkPhotoRepository: Repository<TalkPhoto>,
  ) {}
  // async create(createTalkPhotoDto: CreateTalkPhotoDto) {
  //   try {
  //     const data = new TalkPhoto();
  //     data.talk = createTalkPhotoDto.talkId;
  //     data.url = createTalkPhotoDto.url.join(',');
  //     return await this.talkPhotoRepository.save(data);
  //   } catch (err) {
  //     console.error(err);
  //     return ResultData.messageFail(ErrorCode.PHOTO, '', '新增说说图片失败');
  //   }
  // }

  findAll() {
    return `This action returns all talkPhotos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} talkPhoto`;
  }

  update(id: number, updateTalkPhotoDto: UpdateTalkPhotoDto) {
    return `This action updates a #${id} talkPhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} talkPhoto`;
  }
}
