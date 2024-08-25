import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../../entitis/tag/tag.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { ResultData } from '../../common/utils/result';
import { ErrorCode } from '../../common/constants/constants';
import { create, remove, update } from '../../common/utils/transaction';
import { UpdateTagDto } from './dto/update-tag.dto';
import { transformToNumber } from '../../common/utils/transform';
import { Pagination } from '../../interfaces/pagination';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tag: Repository<Tag>,
  ) {}

  async createTag(createTagDto: CreateTagDto) {
    try {
      const data = new CreateTagDto();
      data.tagName = createTagDto.tagName;
      const res = await this.findTagName(data.tagName);
      if (res) {
        return ResultData.messageFail(ErrorCode.TAG, '标签名称已存在', '');
      }
      return await create(this.tag, Tag, {
        tagName: data.tagName,
      });
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.TAG, '创建标签失败', '');
    }
  }

  async findTagName(tagName: string) {
    try {
      const res = await this.tag
        .createQueryBuilder('tag')
        .select()
        .where(`tag.tagName like :tagName`, {
          tagName: `%${tagName}%`,
        })
        .getCount();
      return res > 0;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async updateTag(updateTagDto: UpdateTagDto) {
    try {
      const data = new UpdateTagDto();
      data.tagName = updateTagDto.tagName;
      data.id = updateTagDto.id;
      const res = await this.findTagName(data.tagName);
      if (res) {
        return ResultData.messageFail(ErrorCode.TAG, '标签名称相同', '');
      }
      return await update(
        this.tag,
        { tagName: data.tagName },
        Tag,
        'id = : id',
        { id: data.id },
      );
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.TAG, '更新标签失败', '');
    }
  }

  async deleteTags(ids: string) {
    try {
      return await remove(true, this.tag, Tag, '', transformToNumber(ids));
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.TAG, '删除标签失败', '');
    }
  }

  /**  */
  async getTagDictionary() {
    try {
      const res = await this.tag.find({
        select: ['id', 'tagName'],
      });
      return ResultData.messageSuccess(res, '查询标签字典成功');
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.TAG, '查询标签字典失败', '');
    }
  }

  async getTagList(pagination: Pagination) {
    try {
      const { current, pageSize } = pagination;
      const skip = (current - 1) * pageSize;
      const options: FindManyOptions<Tag> = {
        skip,
        take: pageSize,
      };
      const [list, total] = await this.tag.findAndCount(options);
      const res = {
        list,
        total: total,
      };
      return ResultData.messageSuccess(res, '获取标签列表成功');
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.TAG, '获取标签列表失败', '');
    }
  }
}
