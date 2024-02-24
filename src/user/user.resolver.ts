import {
  Args,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
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

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  async users(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Query(() => User, { name: 'user' })
  async user(@Args('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    const user = await this.userService.createUser(data);

    return user;
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserInput,
  ) {
    const userUpdated = await this.userService.updateUser(id, data);

    return userUpdated;
  }

  @Mutation(() => CustomResponse, { name: 'deleteUser' })
  async deleteUser(@Args('id') id: string): Promise<CustomResponse> {
    const userDeleted = await this.userService.deleteUser(id);

    return {
      message: 'Usuário excluído com sucesso',
      data: userDeleted,
    };
  }
}
