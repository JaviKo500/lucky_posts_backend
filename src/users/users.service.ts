import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HandelDBExceptionsHelper } from 'src/common/helpers/handel-db-exceptions.helper';

import { RolesService } from 'src/roles/roles.service';
import { GendersService } from 'src/genders/genders.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Gender } from 'src/genders/entities/gender.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
    private readonly gendersService: GendersService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      if (!createUserDto.status) {
        createUserDto.status = 'register';
      }

      const role: Role = await this.rolesService.getDefaultRole(
        createUserDto.roleId,
      );

      let gender: Gender;
      if (createUserDto.genderId) {
        gender = await this.gendersService.findOne(createUserDto.genderId);
      }

      const user = this.userRepository.create({
        ...createUserDto,
        rol: role,
        gender: gender,
      });

      await this.userRepository.save(user);
      user.password = '*****';
      return user;
    } catch (error) {
      HandelDBExceptionsHelper.handelDBExceptions(error, this.logger);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = {
        id,
        ...updateUserDto,
      };
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      HandelDBExceptionsHelper.handelDBExceptions(error, this.logger);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
