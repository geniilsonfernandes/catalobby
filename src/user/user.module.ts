import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from 'src/store/entity/store.entity';
import { StoreService } from 'src/store/store.service';
import { User } from './entity/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Store])],
  providers: [UserService, UserResolver, StoreService],
})
export class UserModule {}
