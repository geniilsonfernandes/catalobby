import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @IsString()
  @IsNotEmpty({
    message: 'O nome da categoria não pode ser vazio',
  })
  @Field()
  catagory_name: string;

  @IsString()
  @IsNotEmpty({
    message: 'O ID do usuário não pode ser vazio',
  })
  @Field()
  store_id: string;
}
