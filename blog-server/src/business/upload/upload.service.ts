// upload.service.ts
import { Injectable } from '@nestjs/common';
import { storage } from '../../common/filter/uploadFiles.filter';

@Injectable()
export class UploadService {
  private storage = storage;

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<{ filePath: string; filename: string }> {
    // 在这里处理文件上传，例如保存到数据库或文件系统
    return {
      filePath: file.path,
      filename: file.filename,
    };
  }
}
