import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Upload from '../../entities/upload/upload.entity';
import { Repository } from 'typeorm';
import { UploadDto } from './dto/upload.dto';
import { ResultData } from '../../common/utils/result';
import { ErrorCode } from '../../common/constants/constants';

@Injectable()
export default class UploadService {
  constructor(
    @InjectRepository(Upload)
    private uploadRepository: Repository<Upload>,
  ) {}

  async saveUploadFileData(fileData: UploadDto) {
    try {
      const newFile = this.uploadRepository.create(fileData);
      await this.uploadRepository.save(newFile);
      return ResultData.messageSuccess(newFile, '文件上传成功');
    } catch (err) {
      console.log(err);
      return ResultData.messageFail(ErrorCode.FILE, '文件上传失败');
    }
  }

  async getFileById(fileId: number) {
    const file = await this.uploadRepository.findOne(fileId);
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}
