import { FilesInterceptor } from '@nestjs/platform-express';
import { Injectable, mixin, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import dayjs from "dayjs";

interface LocalFilesInterceptorOptions {
  fileName: string;
  path?: string;
  fileFilter?: MulterOptions['fileFilter'];
  limits?: MulterOptions['limits'];
}

export function LocalFilesInterceptor(options: LocalFilesInterceptorOptions) {
  @Injectable()
  class UploadInterceptor implements NestInterceptor {
    filesInterceptor: NestInterceptor;
    constructor(configService: ConfigService) {
      const filesDestination = configService.get('UPLOAD_FILES_DESTINATION');
      const destination = `${filesDestination}/${options.path}/${dayjs().format('YYYY-MM')}`;
      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination,
        }),
        fileFilter: options.fileFilter,
        limits: options.limits,
      };
      this.filesInterceptor = new (FilesInterceptor(
        options.fileName,
        20,
        multerOptions,
      ))();
    }
    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.filesInterceptor.intercept(...args);
    }
  }
  return mixin(UploadInterceptor);
}
