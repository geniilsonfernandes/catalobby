import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { CreateProductInput } from './dto';
import { Filters } from './dto/filters.input';
import { Product } from './entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Product, { name: 'createProduct' })
  async createProduct(
    @Args('data') data: CreateProductInput,
  ): Promise<Product> {
    const createdProduct = await this.productService.create(data);
    return createdProduct;
  }

  @Query(() => Product, { name: 'product' })
  async getProductById(@Args('id') id: string): Promise<Product> {
    const product = await this.productService.getProductById(id);
    return product;
  }

  @Query(() => [Product], { name: 'products' })
  async getProducts(
    @Args('store_id') store_id: string,
    @Args('filters') filters?: Filters,
  ): Promise<Product[]> {
    const products = await this.productService.getByStore(store_id, filters);
    return products;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Product, { name: 'disableProduct' })
  async disable(@Args('id') id: string): Promise<Product> {
    const product = await this.productService.disable(id);
    return product;
  }
}
