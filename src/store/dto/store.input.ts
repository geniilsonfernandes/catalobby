import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateStoreInput {
  @IsString()
  @IsNotEmpty({
    message: 'Este campo não pode ser vazio',
  })
  @Field()
  user_id: string;

  @IsString()
  @IsNotEmpty({
    message: 'Este campo não pode ser vazio',
  })
  @Field()
  store_name: string;
}
