import * as path from 'path';
import * as fs from 'fs';

export const validateFileMimeType = (file: string): boolean => {
  const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
  return ALLOWED_MIME_TYPES.includes(file);
};

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
