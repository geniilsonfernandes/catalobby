import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateCategoryInput {
  @IsString()
  @IsNotEmpty({
    message: 'O nome da categoria não pode ser vazio',
  })
  @Field()
  catagory_name: string;
}
