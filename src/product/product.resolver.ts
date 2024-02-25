import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-produt.input';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {}
  @Mutation(() => Product, { name: 'createProduct' })
  async createProduct(
    @Args('data') data: CreateProductInput,
  ): Promise<Product> {
    const createdProduct = await this.productService.create(data);
    return createdProduct;
  }
}
