import { Test, TestingModule } from '@nestjs/testing';

import { CreateProductInput } from './dto';
import { ProductResolver } from './product.resolver';
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

describe('ProductResolver', () => {
  let resolver: ProductResolver;

  const mockProductService = {
    create: jest.fn().mockImplementation((data) => data),
    getProductById: jest.fn().mockImplementation((data) => data),
    getByStore: jest.fn().mockImplementation((data) => data),
    disable: jest.fn().mockImplementation((data) => data),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductResolver,
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    resolver = module.get<ProductResolver>(ProductResolver);
  });

  describe('mutations', () => {
    it('should be create a new product', async () => {
      await resolver.createProduct(product);
      expect(mockProductService.create).toHaveBeenCalled();
    });

    it('should be disable a product', async () => {
      await resolver.disable('1');
      expect(mockProductService.disable).toHaveBeenCalled();
    });
  });

  describe('queries', () => {
    it('should be get products by store', async () => {
      mockProductService.getByStore.mockReturnValue([product]);
      const products = await resolver.getProducts('1');
      expect(mockProductService.getByStore).toHaveBeenCalled();
      expect(products.length).toBe(1);
    });

    it('should not get products by store if not exists', async () => {
      mockProductService.getByStore.mockReturnValue([]);
      const products = await resolver.getProducts('1');
      expect(mockProductService.getByStore).toHaveBeenCalled();
      expect(products.length).toBe(0);
    });

    it('should be get product by id', async () => {
      await resolver.getProductById('1');
      expect(mockProductService.getProductById).toHaveBeenCalled();
    });
  });
});
