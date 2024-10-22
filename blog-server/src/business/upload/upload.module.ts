import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import * as multer from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { storage } from '../../common/filter/uploadFiles.filter';

@Module({
  imports: [
    MulterModule.register({
      storage: storage,
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [MulterModule],
})
export class UploadModule {}
