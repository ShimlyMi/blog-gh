import {
  Bind,
  Controller,
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('upload')
export class UploadController {
  @Post('/one')
  @UseInterceptors(FileInterceptor('file'))
  oneUploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('单个文件上传成功', file);
  }

  @Post('/files')
  @UseInterceptors(FilesInterceptor('files'))
  @Bind(
    UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    ),
  )
  uploadFile(files: Express.Multer.File) {
    console.log(files);
  }
}
