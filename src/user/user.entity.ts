// user.entity.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
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
