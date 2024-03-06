import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { MockRepository } from '../__mocks__/MockRepository';
import { NotFoundStoreException } from './common/erros/NotFoundStoreException';
import { StoreAlreadyExistsException } from './common/erros/StoreAlreadyExistsException';
import { Store } from './entity';
import { StoreService } from './store.service';

const store = {
  id: '1',
  store_name: 'store name',
  admin_id: '1',
};

describe('StoreService', () => {
  let service: StoreService;

  const mockRepository = new MockRepository();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreService,
        {
          provide: getRepositoryToken(Store),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<StoreService>(StoreService);
  });

  it('should be create a new store', async () => {
    mockRepository.findOne.mockReturnValue(null);
    const result = await service.createStore({
      store_name: store.store_name,
      user_id: store.admin_id,
    });

    expect(mockRepository.create).toHaveBeenCalled();
    expect(mockRepository.save).toHaveBeenCalled();
    expect(result.store_name).toBe(store.store_name);
  });

  it('should reject to create if store already exists', async () => {
    mockRepository.findOne.mockReturnValue(store);
    await expect(
      service.createStore({
        store_name: store.store_name,
        user_id: store.admin_id,
      }),
    ).rejects.toBeInstanceOf(StoreAlreadyExistsException);
  });

  it('should get a store', async () => {
    mockRepository.findOne.mockReturnValue(store);
    const result = await service.getStoreById('1');
    expect(result.store_name).toBe(store.store_name);
  });

  it('should not get a store if not exists', async () => {
    mockRepository.findOne.mockReturnValue(null);
    await expect(service.getStoreById('1')).rejects.toBeInstanceOf(
      NotFoundStoreException,
    );
  });

  it('should update a store', async () => {
    mockRepository.findOne.mockReturnValue(store);
    store.store_name = 'new name store';
    mockRepository.save.mockReturnValue(store);
    const result = await service.updateStore(store.id, {
      store_name: 'new name store',
    });
    expect(result.store_name).toBe('new name store');
  });

  it('should not update a store if not exists', async () => {
    mockRepository.findOne.mockReturnValue(null);
    await expect(
      service.updateStore('1', { store_name: 'new name store' }),
    ).rejects.toBeInstanceOf(NotFoundStoreException);
  });

  it('should delete a store', async () => {
    mockRepository.findOne.mockReturnValue(store);
    mockRepository.remove.mockReturnValue(store);
    const result = await service.deleteStore(store.id);
    expect(result).toBe(store);
  });

  it('should not delete a store if not exists', async () => {
    mockRepository.findOne.mockReturnValue(null);
    await expect(service.deleteStore('1')).rejects.toBeInstanceOf(
      NotFoundStoreException,
    );
  });
});
