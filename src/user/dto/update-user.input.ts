import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsNotEmpty({
    message: 'Este campo não pode ser vazio',
  })
  @IsOptional()
  name?: string;
}
