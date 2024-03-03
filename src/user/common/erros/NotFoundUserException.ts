import { NotFoundException } from '@nestjs/common';

export class NotFoundUserException extends NotFoundException {
  constructor(message?: string | object | any, error?: string) {
    super(message || 'Este usuário não existe', error);
  }
}
