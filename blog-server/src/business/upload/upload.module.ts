import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
// import { UploadController } from './upload.controller';
// import { MulterModule } from '@nestjs/platform-express';
// import { ConfigService } from '@nestjs/config';

@Module({
  // controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
