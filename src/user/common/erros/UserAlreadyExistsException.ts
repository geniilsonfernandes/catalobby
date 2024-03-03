import { InternalServerErrorException } from '@nestjs/common';

export class UserAlreadyExistsException extends InternalServerErrorException {
  constructor(message?: string | object | any, error?: string) {
    super(message || 'Este usuário já existe', error);
  }
}
