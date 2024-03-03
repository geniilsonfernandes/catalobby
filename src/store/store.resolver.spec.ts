import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestUltil } from './common/test/TestUltil';
import { Store } from './entity/store.entity';
import { StoreResolver } from './store.resolver';
import { StoreService } from './store.service';

describe('StoreResolver', () => {
  let resolver: StoreResolver;

  const mockStoreService = {
    getStoreById: jest.fn(),
    createStore: jest.fn(),
    updateStore: jest.fn(),
    deleteStore: jest.fn(),
  };

  const mockRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

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
      const store = TestUltil.giveMeAStore();
      mockRepository.findOne.mockReturnValue(store);
      mockStoreService.getStoreById.mockReturnValue(store);
      const result = await resolver.store(store.id);

      expect(result.id).toEqual(store.id);
    });
  });

  describe('mutations', () => {
    it('should be create a store', async () => {
      const store = TestUltil.giveMeAStore();
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
      const store = TestUltil.giveMeAStore();
      mockRepository.create.mockReturnValue(store);
      mockRepository.save.mockReturnValue(store);
      mockStoreService.getStoreById.mockReturnValue(store);
      const result = await resolver.updateStore(store.id, {
        store_name: store.store_name,
      });

      expect(result.message).toBe('Loja atualizada com sucesso');
    });

    it('should be delete a store', async () => {
      const store = TestUltil.giveMeAStore();
      mockRepository.create.mockReturnValue(store);
      mockRepository.save.mockReturnValue(store);
      mockStoreService.getStoreById.mockReturnValue(store);
      const result = await resolver.deleteStore(store.id);
      expect(result.message).toBe('Loja excluída com sucesso');
    });
  });
});
