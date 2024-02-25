import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Store } from 'src/store/store.entity';
import { StoreService } from 'src/store/store.service';
import { GqlAuthGuard } from '../auth/auth.guard';
import { CreateUserType } from './common/create-user.type';
import { DeleteUserType } from './common/delete-user.type';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private storeService: StoreService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user', nullable: true })
  async user(@Args('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  @ResolveField(() => Store, { name: 'store', nullable: true })
  async store(@Parent() user: User): Promise<Store> {
    const store = await this.storeService.getUserStore(user.id);
    return store;
  }

  @UseGuards(GqlAuthGuard)
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

  @UseGuards(GqlAuthGuard)
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
