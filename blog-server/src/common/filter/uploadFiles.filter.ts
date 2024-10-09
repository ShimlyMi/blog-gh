import * as multer from 'multer';
import * as dayjs from 'dayjs';
import { checkAndCreate } from '../utils/validateUpload';
import { extname, join } from 'path';
import * as process from 'process';

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // const basePath = process.env.UPLOAD_FILES_DESTINATION;
    // const folderPath = join(__dirname, '../../../public/upload');
    const folderPath = join(__dirname, '../../../upload');

    const currentDate = dayjs().format('YYYY-MM');
    // console.log(basePath);
    const destinationPath = `${folderPath}/${currentDate}`;

    // 这里可以添加逻辑来确保目录存在
    checkAndCreate(destinationPath);
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    cb(null, `${randomName}${extname(file.originalname)}`);
  },
});
