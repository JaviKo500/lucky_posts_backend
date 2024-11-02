import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateGenderDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(2)
  value: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  createdDate: Date;
}
