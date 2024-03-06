import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CategoryService } from './category.service';
import {
  CategoryResponseType,
  CreateCategoryInput,
  UpdateCategoryInput,
} from './dto';
import { Category } from './entity';

@Resolver()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [Category])
  async categories(@Args('store_id') store_id: string): Promise<Category[]> {
    const result = await this.categoryService.findAll(store_id);
    return result;
  }

  @Mutation(() => CategoryResponseType)
  async createCategory(
    @Args('data') data: CreateCategoryInput,
  ): Promise<CategoryResponseType> {
    const result = await this.categoryService.createCategory({
      catagory_name: data.catagory_name,
      store_id: data.store_id,
    });

    return {
      message: 'Categoria criada com sucesso',
      data: result,
    };
  }

  @Mutation(() => CategoryResponseType)
  async updateCategory(
    @Args('id') id: string,
    @Args('data') data: UpdateCategoryInput,
  ): Promise<CategoryResponseType> {
    const result = await this.categoryService.updateCategory(id, {
      catagory_name: data.catagory_name,
    });

    return {
      message: 'Categoria atualizada com sucesso',
      data: result,
    };
  }

  @Mutation(() => CategoryResponseType)
  async deleteCategory(@Args('id') id: string): Promise<CategoryResponseType> {
    const result = await this.categoryService.deleteCategory(id);
    return {
      message: 'Categoria excluída com sucesso',
      data: result,
    };
  }
}