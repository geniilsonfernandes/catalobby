import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { MockRepository } from '../__mocks__/MockRepository';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { Category } from './entity';

describe('CategoryResolver', () => {
  let resolver: CategoryResolver;

  const mockCategoryService = {
    createCategory: jest.fn().mockImplementation((data) => data),
    updateCategory: jest.fn().mockImplementation((data) => data),
    deleteCategory: jest.fn().mockImplementation((data) => data),
    findAll: jest.fn().mockImplementation((data) => data),
  };

  const mockRepository = new MockRepository();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryResolver,
        {
          provide: getRepositoryToken(Category),
          useValue: mockRepository,
        },
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    resolver = module.get<CategoryResolver>(CategoryResolver);
  });

  describe('mutations', () => {
    it('should create a new category call createCategory', async () => {
      const result = await resolver.createCategory({
        catagory_name: 'test',
        store_id: '1',
      });

      expect(mockCategoryService.createCategory).toHaveBeenCalledWith({
        catagory_name: 'test',
        store_id: '1',
      });

      expect(result.message).toBe('Categoria criada com sucesso');
    });

    it('should be update a category call updateCategory', async () => {
      const result = await resolver.updateCategory('1', {
        catagory_name: 'test',
      });
      expect(mockCategoryService.updateCategory).toHaveBeenCalledWith('1', {
        catagory_name: 'test',
      });

      expect(result.message).toBe('Categoria atualizada com sucesso');
    });

    it('should be delete a category call deleteCategory', async () => {
      const result = await resolver.deleteCategory('1');
      expect(mockCategoryService.deleteCategory).toHaveBeenCalledWith('1');

      expect(result.message).toBe('Categoria excluída com sucesso');
    });
  });

  describe('query', () => {
    it('should be find all category call findAll', async () => {
      await resolver.categories('1');
      expect(mockCategoryService.findAll).toHaveBeenCalledWith('1');
    });
  });
});
