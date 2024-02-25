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

  private async checkIfuserHasStore(user_id: string): Promise<Store> {
    const store = await this.storeRepository.findOne({
      where: { admin_id: user_id },
    });
    return store;
  }

  async findStoreById(id: string): Promise<Store> {
    const store = await this.storeRepository.findOne({
      where: { id },
      relations: ['admin'],
    });

    if (!store) {
      throw new NotFoundException('Este store não existe');
    }

    return store;
  }

  async createStore(store: StoreCreateInput): Promise<Store> {
    const storeExists = await this.checkIfuserHasStore(store.user_id);

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
}
