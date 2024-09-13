import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  nickname?: string;

  @IsString()
  password?: string;

  @IsString()
  avatar?: string;
}
