import { Module } from '@nestjs/common';
import { TalkService } from './talk.service';
import { TalkController } from './talk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talk } from './entities/talk.entity';
import { UserModule } from '../user/user.module';
// import { TalkPhotosModule } from '../talk-photos/talk-photos.module';
import { TalkPhoto } from './entities/talk-photo.entity';

@Module({
  imports: [
    UserModule,
    // TalkPhotosModule,
    TypeOrmModule.forFeature([Talk, TalkPhoto]),
  ],
  controllers: [TalkController],
  providers: [TalkService],
  exports: [TalkService],
})
export class TalkModule {}
