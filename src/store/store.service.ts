import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreCreateInput } from './dto/store.input';
import { StoreUpdateInput } from './dto/update-store.input';
import { Store } from './store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  async findStoreById(id: string): Promise<Store> {
    const store = await this.storeRepository.findOne({
      where: { id },
      relations: ['admin'],
    });

    if (!store) {
      throw new NotFoundException('Loja não encontrada');
    }

    return store;
  }

  async getUserStore(user_id: string): Promise<Store> {
    const stores = await this.storeRepository.findOne({
      where: { admin_id: user_id },
      relations: ['admin'],
    });
    return stores;
  }

  async createStore(store: StoreCreateInput): Promise<Store> {
    const storeExists = await this.getUserStore(store.user_id);

    if (storeExists) {
      throw new NotFoundException('Já existe um store para este usuário');
    }

    const newStore = this.storeRepository.create({
      admin_id: store.user_id,
      store_name: store.store_name,
    });

    const savedStore = await this.storeRepository.save(newStore);
    return savedStore;
  }

  async updateStore(id: string, store: StoreUpdateInput): Promise<Store> {
    const storeExists = await this.findStoreById(id);
    const storeUpdated = await this.storeRepository.save({
      ...storeExists,
      store_name: store.store_name,
    });
    return storeUpdated;
  }

  async deleteStore(id: string): Promise<Store> {
    const checkStore = await this.findStoreById(id);

    if (!checkStore) {
      throw new NotFoundException('Loja não encontrada');
    }

    const store = await this.findStoreById(id);
    return this.storeRepository.remove(store);
  }
}
