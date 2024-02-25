import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class AuthInput {
  @IsString()
  @IsNotEmpty({
    message: 'Este campo não pode ser vazio',
  })
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'Este campo não pode ser vazio',
  })
  @Field()
  password: string;
}
