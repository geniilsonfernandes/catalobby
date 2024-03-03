// user.entity.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Store } from 'src/store/store.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  store_id: string;

  @OneToOne(() => Store, (store) => store.admin_id)
  @JoinColumn({ name: 'store_id' })
  @Field({ nullable: true })
  store: Store;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 3,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 3,
  })
  updatedAt: Date;
}
