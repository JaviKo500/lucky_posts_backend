import { Like, Repository } from 'typeorm';

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { HandelDBExceptionsHelper } from 'src/common/helpers/handel-db-exceptions.helper';

import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';

import { Gender } from './entities/gender.entity';

@Injectable()
export class GendersService {
  private readonly logger = new Logger('GendersService');

  constructor(
    @InjectRepository(Gender)
    private readonly genderRepository: Repository<Gender>,
  ) {}
  async create(createGenderDto: CreateGenderDto) {
    try {
      const gender = this.genderRepository.create({
        ...createGenderDto,
        created_date: createGenderDto.createdDate,
      });
      await this.genderRepository.save(gender);
      return gender;
    } catch (error) {
      HandelDBExceptionsHelper.handelDBExceptions(error, this.logger);
    }
  }

  async findAll(term?: string) {
    try {
      if (!term) {
        return await this.genderRepository.find();
      }
      return await this.genderRepository.find({
        where: {
          value: Like(`%${term.toLowerCase()}%`),
        },
      });
    } catch (error) {
      HandelDBExceptionsHelper.handelDBExceptions(error, this.logger);
    }
  }

  async findOne(id: number) {
    try {
      const gender = await this.genderRepository.findOneBy({
        id,
      });
      if (!gender)
        throw new NotFoundException(`Gender whit id "${id}" not found`);
      return gender;
    } catch (error) {
      HandelDBExceptionsHelper.handelDBExceptions(error, this.logger);
    }
  }

  async update(id: number, updateGenderDto: UpdateGenderDto) {
    try {
      const gender = { id, ...updateGenderDto };
      delete gender.createdDate;
      if (gender.value) {
        gender.value = gender.value.toLowerCase();
      }
      await this.genderRepository.save(gender);
      return gender;
    } catch (error) {
      HandelDBExceptionsHelper.handelDBExceptions(error, this.logger);
    }
  }

  async remove(id: number) {
    try {
      const gender = await this.findOne(id);
      await this.genderRepository.remove(gender);
    } catch (error) {
      HandelDBExceptionsHelper.handelDBExceptions(error, this.logger);
    }
  }
}
