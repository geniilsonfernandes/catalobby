import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class CategoryType {
  @Field()
  id: string;

  @Field()
  category_name: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}

@ObjectType()
export class CategoryResponseType {
  @Field()
  message: string;

  @Field(() => CategoryType, { nullable: true })
  data: CategoryType;
}
