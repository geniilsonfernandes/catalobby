import { UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  Mutation,
  ObjectType,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Store } from 'src/store/store.entity';
import { StoreService } from 'src/store/store.service';
import { GqlAuthGuard } from '../auth/auth.guard';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@ObjectType()
class CustomResponse {
  @Field()
  message: string;

  @Field(() => User, { nullable: true })
  data: User;
}

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private storeService: StoreService,
  ) {}

  @Query(() => [User], { name: 'users' })
  async users(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

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
  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserInput,
  ) {
    const userUpdated = await this.userService.updateUser(id, data);

    return userUpdated;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CustomResponse, { name: 'deleteUser' })
  async deleteUser(@Args('id') id: string): Promise<CustomResponse> {
    const userDeleted = await this.userService.deleteUser(id);

    return {
      message: 'Usuário excluído com sucesso',
      data: userDeleted,
    };
  }
}
