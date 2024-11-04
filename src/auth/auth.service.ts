import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
import { HandelDBExceptionsHelper } from 'src/common/helpers/handel-db-exceptions.helper';
import { BcryptAdapterImpl } from 'src/common/adapters/bcrypt.adapter';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginAuthDto: LoginAuthDto) {
    try {
      const { email, password } = loginAuthDto;

      const user = await this.usersService.findOneByEmail(email);
      if (!BcryptAdapterImpl.compareSync(password, user.password))
        throw new UnauthorizedException('Invalid credentials');

      return {
        access_token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      HandelDBExceptionsHelper.handelDBExceptions(error, this.logger);
    }
  }

  private getJwtToken(data: any) {
    return this.jwtService.sign(data);
  }
}
