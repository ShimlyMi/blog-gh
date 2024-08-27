import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Pagination } from '../../interfaces/pagination';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/add')
  createName(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Post('/update')
  updateName(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(updateCategoryDto);
  }

  @Delete('/delete/:ids')
  deleteName(@Param('ids') ids: string) {
    console.log('controller Ids', ids);
    return this.categoryService.deleteCategories(ids);
  }

  @Post('/getDic')
  findAll() {
    return this.categoryService.getCategoryDictionary();
  }

  @Post('/')
  getList(@Body() pagination: Pagination) {
    return this.categoryService.getCategoryList(pagination);
  }
}
