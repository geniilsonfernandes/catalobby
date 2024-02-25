import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { CreateStoreType } from './common/create-store.type';
import { DeleteStoreType } from './common/delete-store.type';
import { CreateStoreInput } from './dto/store.input';
import { UpdateStoreInput } from './dto/update-store.input';
import { Store } from './store.entity';
import { StoreService } from './store.service';

@Resolver(() => Store)
export class StoreResolver {
  constructor(private storeService: StoreService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Store, { name: 'store', nullable: true })
  async store(@Args('id') id: string): Promise<Store> {
    const store = await this.storeService.findStoreById(id);

    return store;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CreateStoreType, { name: 'createStore' })
  async createStore(
    @Args('data') data: CreateStoreInput,
  ): Promise<CreateStoreType> {
    const storeCreated = await this.storeService.createStore(data);

    return {
      message: 'Loja criada com sucesso',
      data: storeCreated,
    };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CreateStoreType, { name: 'updateStore' })
  async updateStore(
    @Args('id') id: string,
    @Args('data') data: UpdateStoreInput,
  ): Promise<CreateStoreType> {
    const storeUpdated = await this.storeService.updateStore(id, data);

    return {
      message: 'Loja atualizada com sucesso',
      data: storeUpdated,
    };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeleteStoreType, { name: 'deleteStore' })
  async deleteStore(@Args('id') id: string): Promise<DeleteStoreType> {
    const deletedStore = await this.storeService.deleteStore(id);

    return {
      message: 'Loja excluída com sucesso',
      data: deletedStore,
    };
  }
}
