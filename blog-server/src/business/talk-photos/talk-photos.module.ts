import { Module } from '@nestjs/common';
import { TalkPhotosService } from './talk-photos.service';
import { TalkPhotosController } from './talk-photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalkPhoto } from './entities/talk-photo.entity';
import { TalkService } from '../talk/talk.service';
import { TalkModule } from '../talk/talk.module';

@Module({
  imports: [
    // TalkModule,
    TypeOrmModule.forFeature([TalkPhoto]),
  ],
  controllers: [TalkPhotosController],
  providers: [TalkPhotosService],
  exports: [TalkPhotosService],
})
export class TalkPhotosModule {}
