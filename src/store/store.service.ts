import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundStoreException } from './common/erros/NotFoundStoreException';
import { StoreAlreadyExistsException } from './common/erros/StoreAlreadyExistsException';
import { CreateStoreInput } from './dto/store.input';
import { UpdateStoreInput } from './dto/update-store.input';
import { Store } from './entity/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  async findStoreOrFail(id: string): Promise<Store> {
    const store = await this.storeRepository.findOne({
      where: { id },
      relations: ['admin'],
    });
    if (!store) {
      throw new NotFoundStoreException();
    }

    return store;
  }

  private async getUserStore(user_id: string): Promise<Store> {
    const stores = await this.storeRepository.findOne({
      where: { admin_id: user_id },
      relations: ['admin'],
    });
    return stores;
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
      admin_id: store.user_id,
      store_name: store.store_name,
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
