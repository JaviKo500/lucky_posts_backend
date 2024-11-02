import { Injectable, Logger } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { Repository } from 'typeorm';
import { HandelDBExceptionsHelper } from 'src/common/helpers/handel-db-exceptions.helper';

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

  findAll() {
    return `This action returns all genders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gender`;
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

  remove(id: number) {
    return `This action removes a #${id} gender`;
  }
}
