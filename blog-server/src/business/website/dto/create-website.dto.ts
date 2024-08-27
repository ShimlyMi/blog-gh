// import {ApiProperty} from "@nestjs/swagger";
import { IsString } from 'class-validator';

export class CreateWebsiteConfigDto {
  @IsString()
  blogName?: string;
  @IsString()
  blogAvatar?: string;
  @IsString()
  avatarBg?: string;
  @IsString()
  personalSignature?: string;
  @IsString()
  blogNotice?: string;

  // blogName?: string;
  // blogAvatar?: string;
  // avatarBg?: string;
  // personalSignature?: string;
  // blogNotice?: string;
  // viewTimes?: number;

  // @ApiProperty()
  // blogName?: string;
  //
  // @ApiProperty()
  // blogAvatar?: string;
  //
  // @ApiProperty()
  // avatarBg?: string;
  //
  // @ApiProperty()
  // personalSignature?: string;
  //
  // @ApiProperty()
  // blogNotice?: string;
  //
  // @ApiProperty()
  // viewTimes?: number;
}
