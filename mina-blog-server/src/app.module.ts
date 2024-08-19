import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebConfigController } from './web-config/web-config.controller';

@Module({
  imports: [],
  controllers: [AppController, WebConfigController],
  providers: [AppService],
})
export class AppModule {}
