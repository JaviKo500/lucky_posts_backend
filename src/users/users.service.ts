import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { HandelDBExceptionsHelper } from 'src/common/helpers/handel-db-exceptions.helper';

import { RolesService } from 'src/roles/roles.service';
import { GendersService } from 'src/genders/genders.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Gender } from 'src/genders/entities/gender.entity';
import { BcryptAdapterImpl } from 'src/common/adapters/bcrypt.adapter';

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
        first_name: createUserDto.firstName,
        last_name: createUserDto.lastName,
        rol: role,
        gender: gender,
        password: BcryptAdapterImpl.hashSync(createUserDto.password),
      });

      await this.userRepository.save(user);
      user.password = '*****';
      return user;
    } catch (error) {
      HandelDBExceptionsHelper.handelDBExceptions(error, this.logger);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find({
        where: {
          status: 'active',
        },
      });
    } catch (error) {
      HandelDBExceptionsHelper.handelDBExceptions(error, this.logger);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOneBy({
        id,
        status: Not('inactive'),
      });
      if (!user) throw new NotFoundException(`User whit id "${id}" not found`);
      return user;
    } catch (error) {
      HandelDBExceptionsHelper.handelDBExceptions(error, this.logger);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user: User = await this.findOne(id);

      user.status = updateUserDto.status ?? user.status;
      user.updated_date = new Date();

      user.first_name = updateUserDto.username ?? user.username;
      user.first_name = updateUserDto.firstName ?? user.first_name;
      user.last_name = updateUserDto.lastName ?? user.last_name;

      if (updateUserDto.roleId) {
        user.rol = await this.rolesService.getDefaultRole(updateUserDto.roleId);
      }

      if (updateUserDto.genderId) {
        user.gender = await this.gendersService.findOne(updateUserDto.genderId);
      }

      if (updateUserDto.password) {
        user.password = BcryptAdapterImpl.hashSync(updateUserDto.password);
      }
      await this.userRepository.save({
        ...user,
      });
      return user;
    } catch (error) {
      HandelDBExceptionsHelper.handelDBExceptions(error, this.logger);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.findOne(id);
      await this.userRepository.remove(user);
    } catch (error) {
      HandelDBExceptionsHelper.handelDBExceptions(error, this.logger);
    }
  }

  async register(createUserDto: CreateUserDto) {
    try {
      createUserDto.status = 'register';
      return await this.create(createUserDto);
    } catch (error) {
      HandelDBExceptionsHelper.handelDBExceptions(error, this.logger);
    }
  }
}
