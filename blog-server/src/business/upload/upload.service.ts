// upload.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { extname } from 'path';
import dayjs from 'dayjs';
import { checkAndCreate } from '../../common/utils/validateUpload';

@Injectable()
export class UploadService {
  constructor(private configService: ConfigService) {}

  // // getMulterConfig() {
  // //   const basePath = this.configService.get<string>('UPLOAD_FILES_DESTINATION');
  // //   return {
  // //     storage: diskStorage({
  // //       destination: (req, file, cb) => {
  // //         const currentDate = dayjs().format('YYYY-MM');
  // //         const destinationPath = `${basePath}/${currentDate}`;
  // //         // 这里可以添加逻辑来确保目录存在
  // //         checkAndCreate(destinationPath);
  // //         cb(null, destinationPath);
  // //       },
  // //       filename: (req, file, cb) => {
  // //         const randomName = Array(32)
  // //           .fill(null)
  // //           .map(() => Math.round(Math.random() * 16).toString(16))
  // //           .join('');
  // //         cb(null, `${randomName}${extname(file.originalname)}`);
  // //       },
  // //     })
  // //   };
  // }
}
