import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundCategoryException } from './common/erros';
import { CreateCategoryInput } from './dto';
import { Category } from './entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  private async findCategoryOrFail(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['store'],
    });
    if (!category) {
      throw new NotFoundCategoryException();
    }
    return category;
  }

  async createCategory(data: CreateCategoryInput): Promise<Category> {
    const newCategory = this.categoryRepository.create({
      category_name: data.category_name,
      store: {
        id: data.store_id,
      },
    });

    const savedCategory = await this.categoryRepository.save(newCategory);
    return savedCategory;
  }

  async updateCategory(id: string, data: Partial<Category>): Promise<Category> {
    const category = await this.findCategoryOrFail(id);

    const updatedCategory = await this.categoryRepository.save({
      ...category,
      ...data,
    });
    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<Category> {
    const findCategory = await this.findCategoryOrFail(id);

    await this.categoryRepository.delete({ id });
    return findCategory;
  }

  async findAll(store_id: string): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      where: {
        store: {
          id: store_id,
        },
      },
    });
    return categories;
  }
}
