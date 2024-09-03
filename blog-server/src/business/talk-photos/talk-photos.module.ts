import { Module } from '@nestjs/common';
import { TalkPhotosService } from './talk-photos.service';
import { TalkPhotosController } from './talk-photos.controller';

@Module({
  controllers: [TalkPhotosController],
  providers: [TalkPhotosService],
})
export class TalkPhotosModule {}
