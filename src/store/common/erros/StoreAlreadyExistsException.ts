import { InternalServerErrorException } from '@nestjs/common';

export class StoreAlreadyExistsException extends InternalServerErrorException {
  constructor(message?: string | object | any, error?: string) {
    super(message || 'Já existe uma loja com este nome', error);
  }
}
