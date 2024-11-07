import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesModule } from 'src/roles/roles.module';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { GendersModule } from 'src/genders/genders.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([User]), RolesModule, GendersModule],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
