import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';

const product = {
  id: '1',
  title: 'test',
  description: 'test',
  price: 1,
  sku: 1,
  stock: 1,
  store_id: '1',
};

describe('ProductService', () => {
  let service: ProductService;

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
    mockRepository.create.mockReturnValue(product);
    mockRepository.save.mockReturnValue(product);
    const result = await service.create(product);
    expect(result).toEqual(product);
  });

  it('should be find all products', async () => {
    mockRepository.find.mockReturnValue([product]);
    const result = await service.findAll('1');
    expect(result).toEqual([product]);
  });

  it('should be find a product', async () => {
    mockRepository.findOne.mockReturnValue(product);
    const result = await service.findOne('1');
    expect(result).toEqual(product);
  });

  it('should be delete a product', async () => {
    mockRepository.remove.mockReturnValue(product);
    await service.deleteProduct('1');
    expect(mockRepository.remove).toHaveBeenCalled();
  });

  it('should be disable a product', async () => {
    mockRepository.update.mockReturnValue(product);
    await service.disableProduct('1');
    expect(mockRepository.update).toHaveBeenCalled();
  });
});
