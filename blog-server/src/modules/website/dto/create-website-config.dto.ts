import { ApiProperty } from '@nestjs/swagger';

export class CreateWebsiteConfigDto {
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
