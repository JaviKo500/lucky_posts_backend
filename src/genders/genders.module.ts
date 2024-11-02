import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GendersService } from './genders.service';
import { GendersController } from './genders.controller';
import { Gender } from './entities/gender.entity';

@Module({
  controllers: [GendersController],
  providers: [GendersService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Gender])],
  exports: [GendersService],
})
export class GendersModule {}
