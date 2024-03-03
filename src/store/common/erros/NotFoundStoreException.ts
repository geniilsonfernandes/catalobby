import { NotFoundException } from '@nestjs/common';

export class NotFoundStoreException extends NotFoundException {
  constructor(message?: string | object | any, error?: string) {
    super(message || 'Loja não encontrada', error);
  }
}
