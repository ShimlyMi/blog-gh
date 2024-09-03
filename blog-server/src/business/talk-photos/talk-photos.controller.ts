import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TalkPhotosService } from './talk-photos.service';
import { CreateTalkPhotoDto } from './dto/create-talk-photo.dto';
import { UpdateTalkPhotoDto } from './dto/update-talk-photo.dto';

@Controller('talk-photos')
export class TalkPhotosController {
  constructor(private readonly talkPhotosService: TalkPhotosService) {}

  @Post()
  create(@Body() createTalkPhotoDto: CreateTalkPhotoDto) {
    return this.talkPhotosService.create(createTalkPhotoDto);
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
  update(@Param('id') id: string, @Body() updateTalkPhotoDto: UpdateTalkPhotoDto) {
    return this.talkPhotosService.update(+id, updateTalkPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.talkPhotosService.remove(+id);
  }
}
