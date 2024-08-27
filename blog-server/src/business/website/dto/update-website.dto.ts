import { PartialType } from '@nestjs/swagger';
import { CreateWebsiteConfigDto } from './create-website.dto';

export class UpdateWebsiteDto extends PartialType(CreateWebsiteConfigDto) {}
