import { Field, ObjectType } from '@nestjs/graphql';
import { Store } from '../entity/store.entity';

@ObjectType()
class StoreType {
  @Field()
  id: string;

  @Field()
  store_name: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}

@ObjectType()
export class StoreResponseType {
  @Field()
  message: string;

  @Field(() => Store, { nullable: true })
  data: StoreType;
}
