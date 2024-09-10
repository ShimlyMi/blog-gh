import { Module } from '@nestjs/common';
import { TalkService } from './talk.service';
import { TalkController } from './talk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalkPhoto } from '../talk-photos/entities/talk-photo.entity';
import { Talk } from './entities/talk.entity';
import {TalkPhotosService} from "../talk-photos/talk-photos.service";

@Module({
  imports: [TypeOrmModule.forFeature([Talk, TalkPhoto])],
  controllers: [TalkController],
  providers: [TalkPhotosService, TalkService],
  exports: [TalkService],
})
export class TalkModule {}
