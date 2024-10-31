import {
  Bind,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
// import { UploadService } from './upload.service';
import { storage } from '../../common/filter/uploadFiles.filter';
import { ResultData } from '../../common/utils/result';
import { Public } from '../auth/constants';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}
  @Post('/one')
  @UseInterceptors(FileInterceptor('file'))
  oneUploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('单个文件上传成功', file);
  }

  @Public()
  @Post('/files')
  @UseInterceptors(FilesInterceptor('files', 20, { storage }))
  localFiles(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Express.Multer.File[],
  ) {
    const fileResponses = files.map((file) => ({
      filePath: file.path,
      filename: file.filename,
    }));
    return ResultData.messageSuccess(fileResponses, '图片上传成功');
  }
}
