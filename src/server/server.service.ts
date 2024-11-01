import { Injectable } from '@nestjs/common';

@Injectable()
export class ServerService {
  public ping() {
    return { ok: true, message: 'pong' };
  }
}
