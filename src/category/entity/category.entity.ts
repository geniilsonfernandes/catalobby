import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Product } from '../../product/entity';
import { Store } from '../../store/entity';

@Entity({ name: 'categories' })
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { nullable: true })
  id: string;

  @Column({ length: 255 })
  @Field()
  catagory_name: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  @Field({ nullable: true })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  @Field({ nullable: true })
  updated_at: Date;

  @ManyToOne(() => Store, (store) => store.categories)
  @JoinColumn({ name: 'store_id' })
  @Field({ nullable: true })
  store: Store;

  @OneToMany(() => Product, (product) => product.category)
  @JoinColumn()
  @Field(() => [Product], { nullable: true })
  products: Product[];
}
