import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';

@Module({
  controllers: [RolesController],
  providers: [RolesService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Role])],
  exports: [RolesService],
})
export class RolesModule {}
