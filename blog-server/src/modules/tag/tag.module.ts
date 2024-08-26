import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from '../../controllers/tag/tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from '../../entities/tag/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
