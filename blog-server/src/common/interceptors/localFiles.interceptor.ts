import { FilesInterceptor } from '@nestjs/platform-express';
import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

interface LocalFilesInterceptorOptions {
  fileName: string;
  path?: string;
  fileFilter?: MulterOptions['fileFilter'];
  limits?: MulterOptions['limits'];
}

function LocalFilesInterceptor(
  options: LocalFilesInterceptorOptions,
): Type<NestInterceptor> {
  @Injectable()
  class uploadFilesInterceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor(configService: ConfigService) {
      const filesDestination = configService.get('UPLOAD_FILES_DESTINATION');
      const destination = `${filesDestination}${options.path}`;

      const localOptions: MulterOptions = {
        storage: diskStorage({
          destination,
        }),
        fileFilter: options.fileFilter,
        limits: options.limits,
      };
      this.fileInterceptor = new (FilesInterceptor(
        options.fileName,
        localOptions,
      ))();
    }
    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileInterceptor.intercept(...args);
    }
  }
  return mixin(uploadFilesInterceptor);
}

export default LocalFilesInterceptor;
