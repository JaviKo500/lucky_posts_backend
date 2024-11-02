import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { HandelDBExceptionsHelper } from 'src/common/helpers/handel-db-exceptions.helper';

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
      HandelDBExceptionsHelper.handelDBExceptions(error, this.logger);
    }
  }

  async findAll(term?: string) {
    try {
      if (!term) {
        return await this.roleRepository.find();
      }

      return await this.roleRepository.find({
        where: {
          name: Like(`%${term.toLowerCase()}%`),
        },
      });
    } catch (error) {
      HandelDBExceptionsHelper.handelDBExceptions(error, this.logger);
    }
  }

  async findOne(id: number) {
    try {
      const role = await this.roleRepository.findOneBy({
        id,
      });
      if (!role) throw new NotFoundException(`Role whit id "${id}" not found`);
      return role;
    } catch (error) {
      HandelDBExceptionsHelper.handelDBExceptions(error, this.logger);
    }
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
      HandelDBExceptionsHelper.handelDBExceptions(error, this.logger);
    }
  }

  async remove(id: number) {
    try {
      const role = await this.findOne(id);
      await this.roleRepository.remove(role);
    } catch (error) {
      HandelDBExceptionsHelper.handelDBExceptions(error, this.logger);
    }
  }
}
