import { PartialType } from '@nestjs/swagger';
import { CreateTagDto } from './create-tag.dto';
import { IsNumber } from 'class-validator';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @IsNumber()
  id: string;
}
