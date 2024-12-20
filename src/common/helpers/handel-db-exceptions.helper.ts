import {
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

export class HandelDBExceptionsHelper {
  static handelDBExceptions(error: any, logger: Logger) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    if (error.status === 404) {
      throw new NotFoundException(error.message);
    }
    if (error.status === 401) {
      throw new UnauthorizedException(error.message);
    }
    logger.error(`${error.message} - ${error.detail}`);
    throw new InternalServerErrorException(
      'Unexpected error check server logs',
    );
  }
}
