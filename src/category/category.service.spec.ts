import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { MockRepository } from '../__mocks__/MockRepository';
import { CategoryService } from './category.service';
import { NotFoundCategoryException } from './common/erros';
import { Category } from './entity';

const category = {
  id: '1',
  catagory_name: 'category1',
  created_at: '2022-01-01T00:00:00.000Z',
  updated_at: '2022-01-01T00:00:00.000Z',
};

describe('CategoryService', () => {
  let service: CategoryService;

  const mockRepository = new MockRepository();
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should create a new category', async () => {
    await service.createCategory({
      catagory_name: category.catagory_name,
      store_id: category.id,
    });
    expect(mockRepository.create).toHaveBeenCalled();
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('should be update a category', async () => {
    await service.updateCategory(category.id, {
      catagory_name: category.catagory_name,
    });
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('should not be update a category if not exists', async () => {
    mockRepository.findOne.mockReturnValue(null);

    await expect(
      service.updateCategory('1', {
        catagory_name: category.catagory_name,
      }),
    ).rejects.toBeInstanceOf(NotFoundCategoryException);
  });

  it('should be delete a category', async () => {
    mockRepository.findOne.mockReturnValue(category);
    await service.deleteCategory(category.id);
    expect(mockRepository.delete).toHaveBeenCalled();
  });

  it('should not be delete a category if not exists', async () => {
    mockRepository.findOne.mockReturnValue(null);
    await expect(service.deleteCategory('1')).rejects.toBeInstanceOf(
      NotFoundCategoryException,
    );
  });

  it('should get all category', async () => {
    await service.findAll(category.id);
    expect(mockRepository.findOne).toHaveBeenCalled();
  });
});
