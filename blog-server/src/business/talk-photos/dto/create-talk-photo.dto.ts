import { IsArray, IsNumber } from 'class-validator';

export class CreateTalkPhotoDto {
  @IsNumber()
  talkId: number;
  @IsArray()
  url: string[];
}
