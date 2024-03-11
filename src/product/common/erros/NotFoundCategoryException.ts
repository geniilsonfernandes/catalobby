import { NotFoundException } from '@nestjs/common';

export class NotFoundProductException extends NotFoundException {
  constructor(message?: string | object | any, error?: string) {
    super(message || 'Nenhum produto encontrado', error);
  }
}
