import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { JwtPayloadInterface } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  validate = async (payload: JwtPayloadInterface): Promise<User> => {
    const { id } = payload;
    const user = await this.userRepository.findOneBy({
      id: parseInt(id.toString()),
    });
    if (!user) throw new UnauthorizedException('Invalid token');
    if (user.status !== 'active')
      throw new UnauthorizedException('User is inactive, talk with admin');
    return user;
  };
}
