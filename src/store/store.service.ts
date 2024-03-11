import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundStoreException } from './common/erros/NotFoundStoreException';
import { StoreAlreadyExistsException } from './common/erros/StoreAlreadyExistsException';

import { CreateStoreInput, UpdateStoreInput } from './dto';
import { Store } from './entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  private async findStoreOrFail(id: string): Promise<Store> {
    const store = await this.storeRepository.findOne({
      where: { id },
      relations: ['categories', 'products', 'user'],
    });

    if (!store) {
      throw new NotFoundStoreException();
    }

    return store;
  }

  async getUserStore(user_id: string): Promise<Store> {
    const store = await this.storeRepository.findOne({
      where: {
        user: {
          id: user_id,
        },
      },
      relations: ['categories', 'products', 'user'],
    });

    return store;
  }

  async getStoreById(id: string): Promise<Store> {
    const store = await this.findStoreOrFail(id);
    return store;
  }

  async createStore(store: CreateStoreInput): Promise<Store> {
    const userAlreadyHasStore = await this.getUserStore(store.user_id);

    if (userAlreadyHasStore) {
      throw new StoreAlreadyExistsException('Este usuário já possui uma loja');
    }

    const newStore = this.storeRepository.create({
      store_name: store.store_name,
      user: {
        id: store.user_id,
      },
    });

    const savedStore = await this.storeRepository.save(newStore);
    return savedStore;
  }

  async updateStore(id: string, data: UpdateStoreInput): Promise<Store> {
    const store = await this.findStoreOrFail(id);
    const storeUpdated = await this.storeRepository.save({
      ...store,
      store_name: data.store_name,
    });
    return storeUpdated;
  }

  async deleteStore(id: string): Promise<Store> {
    const store = await this.findStoreOrFail(id);

    return this.storeRepository.remove(store);
  }
}
