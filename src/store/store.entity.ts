import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/entity/user.entity';
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

@Entity({ name: 'stores' })
@ObjectType()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { nullable: true })
  id: string;

  @Column()
  @Field({ nullable: true })
  admin_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'admin_id' })
  @HideField()
  admin: User;

  @Column()
  @Field({ nullable: true })
  store_name: string;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 3,
  })
  @Field({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 3,
  })
  @Field({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.store)
  @Field(() => [Product], { nullable: true })
  products: Product[];
}
