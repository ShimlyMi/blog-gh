import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TalkService } from './talk.service';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';
import { Public } from '../auth/constants';

@Controller('talk')
export class TalkController {
  constructor(private readonly talkService: TalkService) {}

  @Public()
  @Post('/add')
  create(@Body() createTalkDto: CreateTalkDto) {
    return this.talkService.addTalk(createTalkDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.talkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.talkService.findOne(+id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateTalkDto: UpdateTalkDto) {
    return this.talkService.update(+id, updateTalkDto);
  }

  @Delete('/remove/:id')
  remove(@Param('id') id: string) {
    return this.talkService.remove(+id);
  }
}
