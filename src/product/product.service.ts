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

  async findAll(store_id: string): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: {
        store: {
          id: store_id,
        },
      },
    });

    return products;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
      },
    });
    return product;
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  async disableProduct(id: string): Promise<void> {
    const product = await this.findOne(id);
    product.active = false;
    await this.productRepository.update(id, product);
  }
}
