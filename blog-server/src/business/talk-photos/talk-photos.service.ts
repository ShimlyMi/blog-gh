import { Injectable } from '@nestjs/common';
import { UpdateTalkPhotoDto } from './dto/update-talk-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TalkPhoto } from './entities/talk-photo.entity';
import { Repository } from 'typeorm';
import { ResultData } from '../../common/utils/result';
import { ErrorCode } from '../../common/constants/constants';
import { CreateTalkPhotoDto } from './dto/create-talk-photo.dto';

// import { TalkService } from '../talk/talk.service';

@Injectable()
export class TalkPhotosService {
  constructor(
    // private talkService: TalkService,
    @InjectRepository(TalkPhoto)
    private talkPhotoRepository: Repository<TalkPhoto>,
  ) {}

  async createPic(data: CreateTalkPhotoDto) {
    try {
      console.log(data);
      const talkPhoto = new TalkPhoto();
      // console.log(typeof talkPhoto.talk)
      // talkPhoto.talk = data.talkId;
      talkPhoto.url = data.url;
      const res = await this.talkPhotoRepository.save(talkPhoto);
      return ResultData.messageSuccess(res, '添加说说图片成功');
      // const res = await this.talkPhotoRepository.save(createTalkPhotoDto)
      // return ResultData.messageSuccess(res, '添加说说图片成功')
    } catch (err) {
      console.log(err);
      return ResultData.messageFail(ErrorCode.TALK, '添加说说图片失败', '');
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
