import {
  IsEmail,
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  public username: string;

  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(4)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  public password: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
  public firstName: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
  public lastName: string;

  @IsString()
  @IsIn(['active', 'inactive', 'register', 'unverified'])
  @IsOptional()
  status: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  @IsOptional()
  roleId: number;

  @IsInt()
  @IsPositive()
  @Min(1)
  @IsOptional()
  genderId: number;
}
