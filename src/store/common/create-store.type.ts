import { Field, ObjectType } from '@nestjs/graphql';
import { Store } from '../entity/store.entity';

@ObjectType()
export class CreateStoreType {
  @Field()
  message: string;

  @Field(() => Store, { nullable: true })
  data: Store;
}
