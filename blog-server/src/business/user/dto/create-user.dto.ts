import { IsArray, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  nickname?: string;

  @IsArray()
  role?: string[];
}
