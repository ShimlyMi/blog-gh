import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import UploadService from "../../modules/upload/upload.service";

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2MB

@Controller('upload')
export default class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtName}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        // 检查 MIME 类型
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
          return cb(
            new HttpException(
              `Unsupported file type ${file.mimetype}`,
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }

        // 检查文件大小（可选，因为已经有了 limits 配置）
        // 但如果你想在这里做更多处理，比如记录日志，可以这样做
        if (file.size > MAX_FILE_SIZE) {
          return cb(
            new HttpException(
              `File is too large (max ${MAX_FILE_SIZE / 1024 / 1024} MB)`,
              HttpStatus.PAYLOAD_TOO_LARGE,
            ),
            false,
          );
        }

        cb(null, true);
      },
      limits: { fileSize: MAX_FILE_SIZE }, // 在这里设置最大文件大小限制
    }),
  )
  uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files.length) {
      throw new HttpException(
        'No files were uploaded.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const uploadedFiles = files.map((file) => ({
      originalName: file.originalname,
      fileName: file.filename,
    }));

    return { message: 'Files uploaded successfully', files: uploadedFiles };
  }
}
