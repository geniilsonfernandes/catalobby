import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { join } from 'path';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { Category } from './category/entity';
import { Product } from './product/product.entity';
import { Store } from './store/entity';
import { User } from './user/entity/user.entity';

import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const requiredEnvVariables = [
          'DB_HOST',
          'DB_PORT',
          'DB_USERNAME',
          'DB_PASSWORD',
          'DB_DATABASE',
        ];
        for (const envVar of requiredEnvVariables) {
          if (!configService.get<string>(envVar)) {
            throw new Error(`Variável de ambiente ${envVar} não definida.`);
          }
        }

        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT', 5432),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [User, Store, Product, Category],
          synchronize: true,
          // logging: true,
        };
      },
      inject: [ConfigService],
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
    }),
    UserModule,
    AuthModule,
    StoreModule,
    ProductModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
