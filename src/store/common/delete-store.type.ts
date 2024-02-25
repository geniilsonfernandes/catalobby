import { Field, ObjectType } from '@nestjs/graphql';
import { Store } from '../store.entity';

@ObjectType()
export class DeleteStoreType {
  @Field()
  message: string;

  @Field(() => Store, { nullable: true })
  data: Store;
}
