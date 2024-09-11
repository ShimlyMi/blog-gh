import {
  Bind,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
// import { UploadService } from './upload.service';
import { storage } from '../../common/filter/uploadFiles.filter';
import { ResultData } from '../../common/utils/result';
import {Public} from "../auth/constants";

@Controller('upload')
export class UploadController {
  // constructor(private uploadService: UploadService) {}
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
    files: Express.Multer.File,
  ) {
    return ResultData.messageSuccess(
      { filePath: files },
      'File uploaded successfully',
    );
  }
}
