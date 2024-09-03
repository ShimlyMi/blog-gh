import { PartialType } from '@nestjs/swagger';
import { CreateTalkPhotoDto } from './create-talk-photo.dto';

export class UpdateTalkPhotoDto extends PartialType(CreateTalkPhotoDto) {}
