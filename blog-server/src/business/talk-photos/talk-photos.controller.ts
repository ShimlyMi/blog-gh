import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TalkPhotosService } from './talk-photos.service';
import { CreateTalkPhotoDto } from './dto/create-talk-photo.dto';
import { UpdateTalkPhotoDto } from './dto/update-talk-photo.dto';
import { Public } from '../auth/constants';
import { CreateTalkDto } from '../talk/dto/create-talk.dto';

@Controller('talkPhotos')
export class TalkPhotosController {
  constructor(private readonly talkPhotosService: TalkPhotosService) {}

  @Public()
  @Post('/createPic')
  create(@Body() data: CreateTalkPhotoDto) {
    return this.talkPhotosService.createPic(data);
  }

  @Get()
  findAll() {
    return this.talkPhotosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.talkPhotosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTalkPhotoDto: UpdateTalkPhotoDto,
  ) {
    return this.talkPhotosService.update(+id, updateTalkPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.talkPhotosService.remove(+id);
  }
}
