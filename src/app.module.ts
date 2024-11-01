import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { ServerModule } from './server/server.module';
@Module({
  imports: [ConfigModule.forRoot(), ServerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
