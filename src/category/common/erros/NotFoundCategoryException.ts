import { NotFoundException } from '@nestjs/common';

export class NotFoundCategoryException extends NotFoundException {
  constructor(message?: string | object | any, error?: string) {
    super(message || 'Esta categoria não existe', error);
  }
}
