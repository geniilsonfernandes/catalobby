import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({
    message: 'Este campo não pode ser vazio',
  })
  name: string;

  @IsNotEmpty({
    message: 'Este campo não pode ser vazio',
  })
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'Este campo não pode ser vazio',
  })
  password: string;
}
