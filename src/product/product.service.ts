import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-produt.input';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(product: CreateProductInput): Promise<Product> {
    const createdProduct = this.productRepository.create({
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock,
      active: true,
      sku: product.sku,
      store: {
        id: product.store_id,
      },
    });

    const savedProduct = await this.productRepository.save(createdProduct);
    return savedProduct;
  }
}
