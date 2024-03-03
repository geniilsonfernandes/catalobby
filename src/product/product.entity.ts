import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Store } from '../store/store.entity';

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
  @HideField()
  store: Store;
}
