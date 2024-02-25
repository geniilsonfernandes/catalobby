import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsString()
  @IsNotEmpty({
    message: 'Este campo não pode ser vazio',
  })
  @Field()
  title: string;

  @IsString()
  @IsNotEmpty({
    message: 'Este campo não pode ser vazio',
  })
  @Field()
  description: string;

  @IsNumber()
  @IsNotEmpty({
    message: 'Este campo não pode ser vazio',
  })
  @Field(() => Number)
  price: number;

  @IsNumber()
  @IsNotEmpty({
    message: 'Este campo não pode ser vazio',
  })
  @Field(() => Number)
  sku: number;

  @IsNumber()
  @IsNotEmpty({
    message: 'Este campo não pode ser vazio',
  })
  @Field(() => Number)
  stock: number;

  @IsString()
  @IsNotEmpty({
    message: 'Este campo não pode ser vazio',
  })
  @Field()
  store_id: string;
}
