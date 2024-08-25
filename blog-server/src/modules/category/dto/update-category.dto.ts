import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsNumber, IsString } from 'class-validator';

// export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
//   id: number;
// }
export class UpdateCategoryDto {
  @IsNumber()
  id: number;

  @IsString()
  categoryName: string;
}
