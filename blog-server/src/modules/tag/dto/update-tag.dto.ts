import { IsNumber, IsString } from 'class-validator';

export class UpdateTagDto {
  @IsString()
  tagName: string;

  @IsNumber()
  id: string;
}
