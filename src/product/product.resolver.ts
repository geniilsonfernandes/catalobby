import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { CreateProductInput } from './dto';
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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Product, { name: 'disableProduct' })
  async disable(@Args('id') id: string): Promise<Product> {
    const product = await this.productService.disable(id);
    return product;
  }

  @Query(() => [Product], { name: 'getProductsByCategory' })
  async getByCategory(
    @Args('category_id') category_id: string,
    @Args('store_id') store_id: string,
  ): Promise<Product[]> {
    const products = await this.productService.getByCategory(
      category_id,
      store_id,
    );
    return products;
  }

  @Query(() => Product, { name: 'getProductById' })
  async getProductById(@Args('id') id: string): Promise<Product> {
    const product = await this.productService.getProductById(id);
    return product;
  }

  @Query(() => [Product], { name: 'getProducts' })
  async getProducts(@Args('store_id') store_id: string): Promise<Product[]> {
    const products = await this.productService.getByStore(store_id);
    return products;
  }
}
