import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Category } from '../../entitis/category/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ResultData } from '../../common/utils/result';
import { ErrorCode } from '../../common/constants/constants';
import { remove, update, create } from '../../common/utils/transaction';
import { transformToNumber } from '../../common/utils/transform';
import { Pagination } from '../../interfaces/pagination';
import { Tag } from '../../entitis/tag/tag.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly category: Repository<Category>,
  ) {}

  async findCategory(categoryName: string) {
    try {
      // console.log('categoryName', categoryName);
      const res = await this.category
        .createQueryBuilder('category')
        .select()
        .where(`category.categoryName like :categoryName`, {
          categoryName: `%${categoryName}%`,
        })
        .getCount();
      return res > 0;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const data = new CreateCategoryDto();
      data.categoryName = createCategoryDto.categoryName;

      const res = await this.findCategory(data.categoryName);
      if (res) {
        return ResultData.messageFail(ErrorCode.CATEGORY, '已存在该分类', '');
      }
      return await create(this.category, Category, {
        categoryName: data.categoryName,
      });
      // return this.category.save(data);
      // return ResultData.messageSuccess( res, '创建成功');
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.CATEGORY, '创建分类失败', '');
    }
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto) {
    try {
      const data = new UpdateCategoryDto();
      data.categoryName = updateCategoryDto.categoryName;
      data.id = updateCategoryDto.id;
      console.log('data', data.categoryName);
      const res = await this.findCategory(data.categoryName);
      if (res) {
        return ResultData.messageFail(ErrorCode.CATEGORY, '分类名称相同', '');
      }
      return await update(
        this.category,
        { categoryName: data.categoryName },
        Category,
        'id = :id',
        { id: data.id },
      );
    } catch (err) {
      console.log(err);
      return ResultData.messageFail(ErrorCode.CATEGORY, '修改分类名称失败', '');
    }
  }

  async deleteCategories(ids: string) {
    try {
      return await remove(
        true,
        this.category,
        Category,
        '',
        transformToNumber(ids),
      );
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.CATEGORY, '删除分类失败', '');
    }
  }
  async getCategoryDictionary() {
    try {
      const res = await this.category.find({
        select: ['id', 'categoryName'],
      });
      return ResultData.messageSuccess(res, '查询分类字典成功');
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.CATEGORY, '查询分类字典失败', '');
    }
  }

  async getCategoryList(pagination: Pagination) {
    try {
      const { current, pageSize } = pagination;
      const skip = (current - 1) * pageSize;
      const options: FindManyOptions<Category> = {
        skip,
        take: pageSize,
      };
      const [list, total] = await this.category.findAndCount(options);
      const res = {
        list,
        total: total,
      };
      return ResultData.messageSuccess(res, '获取分类列表成功');
    } catch (err) {
      console.error(err);
      return ResultData.messageFail(ErrorCode.CATEGORY, '获取分类列表失败', '');
    }
  }
}
