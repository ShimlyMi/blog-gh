import { validateFileMimeType } from '../utils/validateUpload';
import { ResultData } from '../utils/result';

export const UploadFilesFilter = (
  req?: any,
  file: Express.Multer.File,
  callback?: (error: Error | null, acceptFile: boolean) => void,
): ResultData => {
  if (!validateFileMimeType(file.mimetype)) {
    callback(new Error('文件类型错误，只允许图片上传'), false);
  }
  callback(null, true);
  return ResultData.messageSuccess('', '图片上传成功');
};
