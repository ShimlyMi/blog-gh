import { Injectable } from '@nestjs/common';
import { CreateTalkPhotoDto } from './dto/create-talk-photo.dto';
import { UpdateTalkPhotoDto } from './dto/update-talk-photo.dto';

@Injectable()
export class TalkPhotosService {
  create(createTalkPhotoDto: CreateTalkPhotoDto) {
    return 'This action adds a new talkPhoto';
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
