import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../category/entity';
import { Product } from '../../product/product.entity';
import { User } from '../../user/entity/user.entity';

@Entity({ name: 'stores' })
@ObjectType()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { nullable: true })
  id: string;

  @Column()
  @Field({ nullable: true })
  store_name: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'admin_id' })
  user: User;

  @OneToMany(() => Category, (category) => category.store)
  @Field(() => [Category], { nullable: true })
  categories: Category[];

  @OneToMany(() => Product, (product) => product.store)
  @Field(() => [Product], { nullable: true })
  products: Product[];

  @CreateDateColumn({
    type: 'timestamp',
    precision: 3,
  })
  @Field({ nullable: true })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 3,
  })
  @Field({ nullable: true })
  updated_at: Date;
}
