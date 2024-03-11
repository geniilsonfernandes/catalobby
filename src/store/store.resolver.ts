import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/auth.guard';

import { StoreResponseType } from './dto';
import { CreateStoreInput } from './dto/store.input';
import { UpdateStoreInput } from './dto/update-store.input';
import { Store } from './entity';
import { StoreService } from './store.service';

@Resolver(() => Store)
export class StoreResolver {
  constructor(private storeService: StoreService) {}

  @Query(() => Store, { name: 'store', nullable: true })
  async store(@Args('id') id: string): Promise<Store> {
    const store = await this.storeService.getStoreById(id);

    return store;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => StoreResponseType, { name: 'createStore' })
  async createStore(
    @Args('data') data: CreateStoreInput,
  ): Promise<StoreResponseType> {
    const storeCreated = await this.storeService.createStore(data);

    return {
      message: 'Loja criada com sucesso',
      data: storeCreated,
    };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => StoreResponseType, { name: 'updateStore' })
  async updateStore(
    @Args('id') id: string,
    @Args('data') data: UpdateStoreInput,
  ): Promise<StoreResponseType> {
    const storeUpdated = await this.storeService.updateStore(id, data);

    return {
      message: 'Loja atualizada com sucesso',
      data: storeUpdated,
    };
  }

  // @UseGuards(GqlAuthGuard)
  // @Mutation(() => StoreResponseType, { name: 'deleteStore' })
  // async deleteStore(@Args('id') id: string): Promise<StoreResponseType> {
  //   const deletedStore = await this.storeService.deleteStore(id);

  //   return {
  //     message: 'Loja excluída com sucesso',
  //     data: deletedStore,
  //   };
  // }
}
