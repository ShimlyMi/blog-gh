import { Injectable } from '@nestjs/common';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Talk } from './entities/talk.entity';
import { Repository } from 'typeorm';
import { ResultData } from '../../common/utils/result';
import { ErrorCode } from '../../common/constants/constants';
import { UserService } from '../user/user.service';
import { TalkPhoto } from '../talk-photos/entities/talk-photo.entity';

@Injectable()
export class TalkService {
  constructor(
    private userService: UserService,
    @InjectRepository(Talk)
    private talkRepository: Repository<Talk>,
    @InjectRepository(TalkPhoto)
    private talkPhotoRepository: Repository<TalkPhoto>,
  ) {}
  async addTalk(createTalkDto: CreateTalkDto) {
    console.log(JSON.stringify(createTalkDto));
    try {
      const talk = new Talk();
      talk.content = createTalkDto.content;
      talk.status = createTalkDto.status;
      talk.isTop = createTalkDto.isTop;
      talk.user = createTalkDto.userId
      const res = await this.talkRepository.save(talk);
      const talkPhoto = new TalkPhoto();
      talkPhoto.talk = talk.talkPic;
      talkPhoto.url = createTalkDto.url;
      if (res.id) {
        await this.talkPhotoRepository.save(talkPhoto)
      }
      return ResultData.messageSuccess(res, '新增说说成功');
    } catch (err) {
      console.log(err);
      return ResultData.messageFail(ErrorCode.TALK, '发表说说失败', '');
    }
  }
  async findAll() {
    try {
      const res = await this.talkRepository.find();
      return ResultData.messageSuccess(res, '查询说说成功');
    } catch (err) {
      console.log(err);
      return ResultData.messageFail(ErrorCode.TALK, '查询说说失败', '');
    }
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
