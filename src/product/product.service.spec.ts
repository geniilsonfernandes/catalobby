import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { MockRepository } from '../__mocks__/MockRepository';
import { NotFoundProductException } from './common/erros';
import { CreateProductInput } from './dto';
import { Product } from './entity';
import { ProductService } from './product.service';

const product = {
  category_id: '1',
  store_id: '1',
  description: 'test',
  nome: 'test',
  price: 1340,
  sku: 12349,
  stock: 10,
} as CreateProductInput;

describe('ProductService', () => {
  let service: ProductService;

  const mockRepository = new MockRepository();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be create a new product', async () => {
    await service.create(product);
    expect(mockRepository.create).toHaveBeenCalled();
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('should be get products by store', async () => {
    mockRepository.find.mockReturnValue([product]);
    const products = await service.getByStore('1');

    expect(mockRepository.find).toHaveBeenCalled();
    expect(products.length).toBe(1);
  });

  it('should not get products by store if not exists', async () => {
    mockRepository.find.mockReturnValue([]);
    const products = await service.getByStore('1');

    expect(mockRepository.find).toHaveBeenCalled();
    expect(products.length).toBe(0);
  });

  it('should be disable a product', async () => {
    const product = await service.disable('1');
    expect(product.active).toBe(false);

    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('should not be disable a product if not exists', async () => {
    mockRepository.findOne.mockReturnValue(null);
    await expect(service.disable('1')).rejects.toBeInstanceOf(
      NotFoundProductException,
    );
  });

  it('should be enable a product', async () => {
    const product = await service.enable('1');
    expect(product.active).toBe(true);
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('should not be enable a product if not exists', async () => {
    mockRepository.findOne.mockReturnValue(null);
    await expect(service.enable('1')).rejects.toBeInstanceOf(
      NotFoundProductException,
    );
  });
});
