import { Injectable } from '@nestjs/common';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Talk } from './entities/talk.entity';
import { Repository } from 'typeorm';
import { ResultData } from '../../common/utils/result';
import { TalkPhotosService } from '../talk-photos/talk-photos.service';
import { ErrorCode } from '../../common/constants/constants';

@Injectable()
export class TalkService {
  constructor(
    private talkPhotoService: TalkPhotosService,
    @InjectRepository(Talk)
    private talkRepository: Repository<Talk>,
  ) {}
  async addTalk(createTalkDto: CreateTalkDto) {
    console.log(JSON.stringify(createTalkDto));
    try {
      const talk = new Talk();
      talk.content = createTalkDto.content;
      talk.status = createTalkDto.status;
      talk.isTop = createTalkDto.isTop;
      const res = await this.talkRepository.save(talk);
      const data = {
        talkId: res.id,
        url: createTalkDto.url,
      };
      if (res.id) {
        await this.talkPhotoService.create(data);
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
