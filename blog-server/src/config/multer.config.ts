// config/multer.config.ts
import { Request, Express } from 'express'; // 可能需要根据你的项目调整这些导入
import { DiskStorage } from 'multer';
import * as path from 'path'; // 注意这里使用了 import * as path 而不是 const path = require('path')

// 定义一个接口来描述 Multer 配置
interface MulterConfig {
  dest: string;
  storageOptions: {
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void,
    ) => void;
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void,
    ) => void;
  };
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void,
  ) => void;
  limits: {
    fileSize: number;
  };
}

// 使用接口来定义配置对象
const multerConfig: MulterConfig = {
  dest: './uploads',
  storageOptions: {
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname),
      );
    },
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB
  },
};

export default multerConfig; // 使用 export default 导出配置对象
