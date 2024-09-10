import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTalkDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  status: number;

  @IsNumber()
  isTop: number;

  @IsArray()
  url?: string[];
}
