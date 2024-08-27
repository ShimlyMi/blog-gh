import dayjs from 'dayjs';
import { validateFileMimeType, checkAndCreate } from '../utils/validateUpload';
import { UnsupportedMediaTypeException } from '@nestjs/common';

export const UploadFilesFilter = (mines: string | string[]) => {
  return (
    req: any,
    file: Express.Multer.File,
    callback: (
      error: Error | null,
      acceptFile: boolean,
      filePath?: string,
    ) => void,
  ) => {
    mines = file.originalname.split('.').pop().toLowerCase();
    const temp = 'images';
    if (validateFileMimeType(mines)) {
      callback(null, true);
    } else {
      callback(new UnsupportedMediaTypeException('文件类型错误'), false);
    }
    const filePath = `uploadedFiles/${temp}/${dayjs().format('YYYY-MM')}`;
    checkAndCreate(filePath);
    callback(null, true, `./${filePath}`);
  };
};
