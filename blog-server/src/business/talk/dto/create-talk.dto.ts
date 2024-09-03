import { IsString } from 'class-validator';

export class CreateTalkDto {
  @IsString()
  content: string;
}
