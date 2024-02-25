import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({
    message: 'Este campo não pode ser vazio',
  })
  @Field()
  name: string;

  @IsNotEmpty({
    message: 'Este campo não pode ser vazio',
  })
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'Este campo não pode ser vazio',
  })
  @Field()
  password: string;
}
