import { Injectable } from '@nestjs/common';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Talk } from './entities/talk.entity';
import { Repository } from 'typeorm';
import { ResultData } from '../../common/utils/result';
import { User } from '../user/entities/user.entity';
import { TalkPhoto } from '../talk-photos/entities/talk-photo.entity';
import { create } from '../../common/utils/transaction';
import { TalkPhotosService } from '../talk-photos/talk-photos.service';
import { ErrorCode } from '../../common/constants/constants';

@Injectable()
export class TalkService {
  constructor(
    @InjectRepository(Talk)
    private talkRepository: Repository<Talk>,
    private talkPhotoService: TalkPhotosService,
  ) {}
  async addTalk(createTalkDto: CreateTalkDto) {
    try {
      const talk = new Talk();
      talk.content = createTalkDto.content;
      talk.status = createTalkDto.status;
      talk.isTop = createTalkDto.isTop;
      talk.userId = createTalkDto.userId;
      const talkPhoto = new TalkPhoto();
      if (talk.id) {
        talkPhoto.talkId = talk.id;
        talkPhoto.url = createTalkDto.url;
        await this.talkPhotoService.create(talkPhoto);
      }
      return await create(this.talkRepository, Talk, {
        username: username,
        content: talk.content,
        url: talkPhoto.url,
        isTop: talk.isTop,
        status: talk.status,
      });
    } catch (err) {
      console.log(err);
      return ResultData.messageFail(ErrorCode.TALK, '发表说说失败', '');
    }
  }

  findAll() {
    return `This action returns all talk`;
  }

  findOne(id: number) {
    return `This action returns a #${id} talk`;
  }

  update(id: number, updateTalkDto: UpdateTalkDto) {
    return `This action updates a #${id} talk`;
  }

  remove(id: number) {
    return `This action removes a #${id} talk`;
  }
}
