import { Module } from '@nestjs/common';
import { TalkService } from './talk.service';
import { TalkController } from './talk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talk } from './entities/talk.entity';
import { TalkPhotosModule } from '../talk-photos/talk-photos.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    TalkPhotosModule,
    TypeOrmModule.forFeature([Talk]),
  ],
  controllers: [TalkController],
  providers: [TalkService],
  exports: [TalkService],
})
export class TalkModule {}
