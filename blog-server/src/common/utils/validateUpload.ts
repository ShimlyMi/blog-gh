import * as path from 'path';
import * as fs from 'fs';

export const checkAndCreate = (dirPath: string): boolean => {
  const normalizePath = path.resolve(dirPath);
  if (!fs.existsSync(normalizePath)) {
    fs.mkdirSync(normalizePath, { recursive: true });
    return true;
  } else {
    console.log(`文件夹${normalizePath}已存在`);
    return false;
  }
};
