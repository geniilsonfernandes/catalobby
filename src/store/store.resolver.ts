import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { DeleteStore } from './common/CustomResponse';
import { StoreCreateInput } from './dto/store.input';
import { StoreUpdateInput } from './dto/update-store.input';
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
  @Mutation(() => Store, { name: 'createStore' })
  async createStore(@Args('data') data: StoreCreateInput): Promise<Store> {
    return this.storeService.createStore(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Store, { name: 'updateStore' })
  async updateStore(
    @Args('id') id: string,
    @Args('data') data: StoreUpdateInput,
  ): Promise<Store> {
    return this.storeService.updateStore(id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeleteStore, { name: 'deleteStore' })
  async deleteStore(@Args('id') id: string): Promise<DeleteStore> {
    const deletedStore = await this.storeService.deleteStore(id);

    return {
      message: 'Loja excluída com sucesso',
      data: deletedStore,
    };
  }
}
