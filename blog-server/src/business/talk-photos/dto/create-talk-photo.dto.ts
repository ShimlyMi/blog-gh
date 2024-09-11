import { IsArray, IsNumber } from 'class-validator';

export class CreateTalkPhotoDto {
  @IsArray()
  url: string[];
}
