import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HandelDExceptionsHelper } from 'src/common/helpers/handel-d-exceptions.helper';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  private readonly logger = new Logger('RolesService');
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = this.roleRepository.create(createRoleDto);
      await this.roleRepository.save(role);
      return role;
    } catch (error) {
      HandelDExceptionsHelper.handelDBExceptions(error, this.logger);
    }
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const role = { id, ...updateRoleDto };
      if (role.name) {
        role.name = role.name.toLowerCase();
      }
      await this.roleRepository.save(role);
      return role;
    } catch (error) {
      HandelDExceptionsHelper.handelDBExceptions(error, this.logger);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
