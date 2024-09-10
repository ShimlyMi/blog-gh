import { Injectable } from '@nestjs/common';
import { CreateTalkPhotoDto } from './dto/create-talk-photo.dto';
import { UpdateTalkPhotoDto } from './dto/update-talk-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TalkPhoto } from './entities/talk-photo.entity';
import { Repository } from 'typeorm';
import { ResultData } from '../../common/utils/result';
import { ErrorCode } from '../../common/constants/constants';

@Injectable()
export class TalkPhotosService {
  constructor(
    @InjectRepository(TalkPhoto)
    private talkPhotoRepository: Repository<TalkPhoto>,
  ) {}
  async create(data: any) {
    try {
      // const data = new TalkPhoto();
      // data.url = createTalkPhotoDto.url;
      // data.talkId = createTalkPhotoDto.talkId;
      const res = await this.talkPhotoRepository.save(data);
      return ResultData.messageSuccess(res, '新增说说图片成功');
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.PHOTO, '', '新增说说图片成功');
    }
  }

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
