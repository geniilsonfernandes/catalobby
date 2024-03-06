import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Category } from '../category/entity/category.entity';
import { Store } from '../store/entity/store.entity';

@Entity({ name: 'products' })
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { nullable: true })
  id: string;

  @Column({ length: 255 })
  @Field()
  title: string;

  @Column('text')
  @Field()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Field()
  price: number;

  @Column()
  @Field()
  sku: number;

  @Column()
  @Field()
  stock: number;

  @Column({ default: true })
  @Field()
  active: boolean;

  @ManyToOne(() => Store, (store) => store.products)
  @JoinColumn({ name: 'store_id' })
  @HideField()
  store: Store;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  @Field(() => Category, { nullable: true })
  category: Category;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 3,
  })
  @Field()
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 3,
  })
  @Field({ nullable: true })
  updated_at: Date;
}
