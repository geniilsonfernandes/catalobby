import { Field, ID, ObjectType } from '@nestjs/graphql';
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
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  admin_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'admin_id' })
  admin: User;

  @Column()
  @Field()
  store_name: string;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 3,
  })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 3,
  })
  @Field()
  updatedAt: Date;
}
