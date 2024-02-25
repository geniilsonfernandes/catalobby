import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
}
