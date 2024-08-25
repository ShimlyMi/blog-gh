import {Body, Controller, Post} from '@nestjs/common';
import {ArticleService} from "../../modules/article/article.service";

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('/add')
  addArticle(@Body() article: )
}
