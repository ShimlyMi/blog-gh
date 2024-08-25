import {IsString} from "class-validator";

export class CreateArticleDto {
  @IsString()
  articleTitle: string;

  @IsString()
  articleDescription: string;

  @IsString()
  articleContent: string;
}
