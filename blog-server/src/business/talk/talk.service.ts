import { Injectable } from '@nestjs/common';
import { CreateTalkDto } from './dto/create-talk.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Talk } from './entities/talk.entity';
import { Repository } from 'typeorm';
import { ResultData } from '../../common/utils/result';
import { ErrorCode } from '../../common/constants/constants';
import { UserService } from '../user/user.service';
import { TalkPhoto } from './entities/talk-photo.entity';

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

      const user = await this.userService.findOneByUsername(
        createTalkDto.username,
      );
      console.log(user);
      talk.user = user.data.id;

      // const talkPhotos = new TalkPhoto();
      let res: any;
      // const res = await this.talkRepository.save(talk);
      if (createTalkDto.url.length > 0) {
        /*const talkPhotosId = await this.findOne(res.id);
        talkPhotos.url = createTalkDto.url;
        console.log('talkPhotos.url', talkPhotos.url);
        talkPhotos.talk = talkPhotosId.data.id;
        await this.talkPhotoRepository.save(talkPhotos);
        const photos = await this.findOnwTPicByTalkId(talkPhotos.id);
        talk.photos = photos.data.id;
        await this.talkRepository.save(talk);*/
        talk.url = createTalkDto.url;
        res = await this.talkRepository.save(talk);
      } else {
        res = await this.talkRepository.save(talk);
      }
      return ResultData.messageSuccess(res, '新增说说成功');
    } catch (err) {
      console.log(err);
      return ResultData.messageFail(ErrorCode.TALK, '发表说说失败', '');
    }
  }
  async findAll() {
    try {
      const res = await this.talkRepository
        .createQueryBuilder('talk')
        .select([
          'talk.id',
          'talk.content',
          'talk.url',
          'talk.status',
          'talk.isTop',
          'talk.like_times',
          'talk.updatedAt',
          'talk.user',
          'user.nickname',
        ])
        .leftJoin('talk.user', 'user')
        .getMany();
      // console.log(res)
      return ResultData.messageSuccess(res, '查询说说成功');
    } catch (err) {
      console.log(err);
      return ResultData.messageFail(ErrorCode.TALK, '查询说说失败', '');
    }
  }

  async findTPicByTalkId(id: number) {
    try {
      const res = await this.talkPhotoRepository.find({
        where: { id: id },
      });
      return ResultData.messageSuccess(res, '查询说说图片成功');
    } catch (err) {
      console.log(err);
      return ResultData.messageFail(ErrorCode.TALK, '查询说说图片失败', '');
    }
  }

  async findOnwTPicByTalkId(id: number) {
    try {
      const res = await this.talkPhotoRepository
        .createQueryBuilder('talkPhoto')
        .select('talkPhoto.id')
        .where(`talkPhoto.id = :id`, {
          id: id,
        })
        .getOne();
      return ResultData.messageSuccess(res, '查询说说图片成功');
    } catch (err) {
      console.error(err);
      // return false
      return ResultData.messageFail(ErrorCode.USER, '查询说说图片失败');
    }
  }
  async findOne(id: number) {
    try {
      const res = await this.talkRepository
        .createQueryBuilder('talk')
        .select('talk.id')
        .where(`talk.id = :id`, {
          id: id,
        })
        .getOne();
      return ResultData.messageSuccess(res, '查询说说成功');
    } catch (err) {
      console.error(err);
      // return false
      return ResultData.messageFail(ErrorCode.USER, '查询说说失败');
    }
  }

  // update(id: number, updateTalkDto: UpdateTalkDto) {
  //   return `This action updates a #${id} talk`;
  // }

  remove(id: number) {
    return `This action removes a #${id} talk`;
  }
}
