import {ApiProperty} from "@nestjs/swagger";

export class CreateUploadDto {
    files: Express.Multer.File[];
}
