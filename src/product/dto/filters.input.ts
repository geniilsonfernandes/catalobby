import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class Filters {
  @Field({ nullable: true })
  category_id: string;
}
