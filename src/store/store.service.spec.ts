import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundStoreException } from './common/erros/NotFoundStoreException';
import { StoreAlreadyExistsException } from './common/erros/StoreAlreadyExistsException';
import { TestUltil } from './common/test/TestUltil';
import { Store } from './entity/store.entity';
import { StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService;

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
    const store = TestUltil.giveMeAStore();
    mockRepository.create.mockReturnValue(store);
    mockRepository.save.mockReturnValue(store);

    const result = await service.createStore({
      store_name: store.store_name,
      user_id: store.admin_id,
    });

    expect(result.store_name).toBe(store.store_name);
    expect(result.admin_id).toBe(store.admin_id);
  });

  it('should reject to create if store already exists', async () => {
    const store = TestUltil.giveMeAStore();
    mockRepository.findOne.mockReturnValue(store);
    await expect(
      service.createStore({
        store_name: store.store_name,
        user_id: store.admin_id,
      }),
    ).rejects.toBeInstanceOf(StoreAlreadyExistsException);
  });

  it('should get a store', async () => {
    const store = TestUltil.giveMeAStore();
    mockRepository.findOne.mockReturnValue(store);
    const result = await service.getStoreById('1');
    expect(result.store_name).toBe(store.store_name);
    expect(result.admin_id).toBe(store.admin_id);
  });

  it('should not get a store if not exists', async () => {
    mockRepository.findOne.mockReturnValue(null);
    await expect(service.getStoreById('1')).rejects.toBeInstanceOf(
      NotFoundStoreException,
    );
  });

  it('should update a store', async () => {
    const store = TestUltil.giveMeAStore();
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
    const store = TestUltil.giveMeAStore();
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
