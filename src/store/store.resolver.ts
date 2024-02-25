import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { StoreCreateInput } from './dto/store.input';
import { StoreUpdateInput } from './dto/update-store.input';
import { Store } from './store.entity';
import { StoreService } from './store.service';

@Resolver()
export class StoreResolver {
  constructor(private storeService: StoreService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Store, { name: 'store' })
  async store(@Args('id') id: string): Promise<Store> {
    return this.storeService.findStoreById(id);
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
}
