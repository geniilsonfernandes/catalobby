import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundProductException } from './common/erros';
import { CreateProductInput } from './dto';
import { Product } from './entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(product: CreateProductInput): Promise<Product> {
    const createdProduct = this.productRepository.create({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      active: true,
      sku: product.sku,
      store: {
        id: product.store_id,
      },
      category: {
        id: product.category_id,
      },
    });

    const savedProduct = await this.productRepository.save(createdProduct);
    return savedProduct;
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'store'],
    });

    if (!product) {
      throw new NotFoundProductException();
    }

    return product;
  }

  async getByStore(store_id: string): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: {
        store: {
          id: store_id,
        },
      },
      relations: ['category', 'store'],
    });
    return products;
  }

  async getByCategory(
    category_id: string,
    store_id: string,
  ): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: {
        category: {
          id: category_id,
        },
        store: {
          id: store_id,
        },
      },
      relations: ['category', 'store'],
    });

    return products;
  }

  async disable(id: string): Promise<Product> {
    const product = await this.getProductById(id);
    product.active = false;
    return await this.productRepository.save(product);
  }

  async enable(id: string): Promise<Product> {
    const product = await this.getProductById(id);
    product.active = true;
    return await this.productRepository.save(product);
  }
}
