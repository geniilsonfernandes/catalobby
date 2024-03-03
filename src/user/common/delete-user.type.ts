import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entity/user.entity';

@ObjectType()
export class DeleteUserType {
  @Field()
  message: string;

  @Field(() => User, { nullable: true })
  data: User;
}
