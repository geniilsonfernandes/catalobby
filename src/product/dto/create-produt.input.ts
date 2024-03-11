import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsString()
  @IsNotEmpty({
    message: 'O nome do produto deve ser informado',
  })
  @Field()
  name: string;

  @IsString()
  @IsNotEmpty({
    message: 'Esta descrição deve ser informada',
  })
  @Field()
  description: string;

  @IsNumber()
  @IsNotEmpty({
    message: 'O preço deve ser informado',
  })
  @Field(() => Number)
  price: number;

  @IsNumber()
  @IsNotEmpty({
    message: 'O SKU deve ser informado',
  })
  @Field(() => Number)
  sku: number;

  @IsNumber()
  @IsNotEmpty({
    message: 'O estoque deve ser informado',
  })
  @Field(() => Number)
  stock: number;

  @IsString()
  @IsNotEmpty({
    message: 'O ID da loja deve ser informado',
  })
  @Field()
  store_id: string;

  @IsString()
  @IsNotEmpty({
    message: 'O ID da categoria deve ser informado',
  })
  @Field()
  category_id: string;
}
