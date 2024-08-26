import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import {MulterOptions} from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export const upload = (fieldName = 'files', maxCount?: number, localOptions?: object) => {
    return applyDecorators(UseInterceptors(FilesInterceptor(fieldName, maxCount, localOptions)))
}

export const filesMineTypeFilter(...mines: string[])
