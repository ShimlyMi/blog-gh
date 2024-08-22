import {ApiProperty} from "@nestjs/swagger";

export class CreateWebsiteConfigDto {
  // blogName?: string;
  // blogAvatar?: string;
  // avatarBg?: string;
  // personalSignature?: string;
  // blogNotice?: string;
  // viewTimes?: number;

  @ApiProperty()
  blogName?: string;

  @ApiProperty()
  blogAvatar?: string;

  @ApiProperty()
  avatarBg?: string;

  @ApiProperty()
  personalSignature?: string;

  @ApiProperty()
  blogNotice?: string;

  @ApiProperty()
  viewTimes?: number;
}
