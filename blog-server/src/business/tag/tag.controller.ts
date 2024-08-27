import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Pagination } from '../../interfaces/pagination';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('/add')
  addTag(@Body() createTagDto: CreateTagDto) {
    return this.tagService.createTag(createTagDto);
  }

  @Post('/update')
  updateTag(@Body() updateTagDto: UpdateTagDto) {
    return this.tagService.updateTag(updateTagDto);
  }

  @Delete('/delete/:ids')
  deleteTag(@Param('ids') ids: string) {
    return this.tagService.deleteTags(ids);
  }

  @Get('/getDic')
  findAll() {
    return this.tagService.getTagDictionary();
  }

  @Post('/')
  getList(@Body() pagination: Pagination) {
    return this.tagService.getTagList(pagination);
  }
}
