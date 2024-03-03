import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from '../auth/auth.guard';
import { CreateUserType } from './common/create-user.type';
import { DeleteUserType } from './common/delete-user.type';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  async findUserById(@Args('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Mutation(() => CreateUserType, { name: 'createUser' })
  async createUser(
    @Args('data') data: CreateUserInput,
  ): Promise<CreateUserType> {
    const user = await this.userService.createUser(data);

    return {
      message: 'Usuário criado com sucesso',
      data: user,
    };
  }

  @Mutation(() => CreateUserType, { name: 'updateUser' })
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserInput,
  ): Promise<CreateUserType> {
    const userUpdated = await this.userService.updateUser(id, data);

    return {
      message: 'Usuário atualizado com sucesso',
      data: userUpdated,
    };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeleteUserType, { name: 'deleteUser' })
  async deleteUser(@Args('id') id: string): Promise<DeleteUserType> {
    const userDeleted = await this.userService.deleteUser(id);

    return {
      message: 'Usuário excluído com sucesso',
      data: userDeleted,
    };
  }
}
