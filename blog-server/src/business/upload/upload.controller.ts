import {
  Bind, Body,
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
import {CreateUploadDto} from "./dto/create-upload.dto";

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
    @UploadedFiles()
    files: Express.Multer.File[],
    @Body() createUploadDto: CreateUploadDto,
  ) {
    const fileResponses = files.map((file) => ({
      filePath: file.path,
      filename: file.filename,
    }));
    console.log(JSON.stringify(createUploadDto), JSON.stringify(files))
    console.log(typeof files)
    return ResultData.messageSuccess(fileResponses, '图片上传成功');
  }
}
