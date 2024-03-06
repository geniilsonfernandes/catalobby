import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { MockRepository } from '../__mocks__/MockRepository';
import { Store } from './entity';
import { StoreResolver } from './store.resolver';
import { StoreService } from './store.service';

const store = {
  id: '1',
  store_name: 'store name',
  admin_id: '1',
};

describe('StoreResolver', () => {
  let resolver: StoreResolver;

  const mockStoreService = {
    getStoreById: jest.fn(),
    createStore: jest.fn(),
    updateStore: jest.fn(),
    deleteStore: jest.fn(),
  };

  const mockRepository = new MockRepository();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreResolver,
        {
          provide: StoreService,
          useValue: mockStoreService,
        },
        {
          provide: getRepositoryToken(Store),
          useValue: mockRepository,
        },
      ],
    }).compile();

    resolver = module.get<StoreResolver>(StoreResolver);
  });

  describe('query', () => {
    it('should be find a store by id', async () => {
      mockRepository.findOne.mockReturnValue(store);
      mockStoreService.getStoreById.mockReturnValue(store);
      const result = await resolver.store(store.id);

      expect(result.id).toEqual(store.id);
    });
  });

  describe('mutations', () => {
    it('should be create a store', async () => {
      mockRepository.create.mockReturnValue(store);
      mockRepository.save.mockReturnValue(store);
      mockStoreService.getStoreById.mockReturnValue(store);
      const result = await resolver.createStore({
        store_name: store.store_name,
        user_id: store.admin_id,
      });

      expect(result.message).toBe('Loja criada com sucesso');
    });

    it('should be update a store', async () => {
      mockRepository.create.mockReturnValue(store);
      mockRepository.save.mockReturnValue(store);
      mockStoreService.getStoreById.mockReturnValue(store);
      const result = await resolver.updateStore(store.id, {
        store_name: store.store_name,
      });

      expect(result.message).toBe('Loja atualizada com sucesso');
    });

    it('should be delete a store', async () => {
      mockRepository.create.mockReturnValue(store);
      mockRepository.save.mockReturnValue(store);
      mockStoreService.getStoreById.mockReturnValue(store);
      const result = await resolver.deleteStore(store.id);
      expect(result.message).toBe('Loja excluída com sucesso');
    });
  });
});
