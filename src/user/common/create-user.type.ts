import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entity/user.entity';

@ObjectType()
export class CreateUserType {
  @Field()
  message: string;

  @Field(() => User, { nullable: true })
  data: User;
}
