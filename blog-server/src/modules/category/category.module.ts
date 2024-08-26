import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '../../entities/category/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from '../../controllers/category/category.controller';
// import { categoryProviders } from '../../common/providers/category.providers';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
