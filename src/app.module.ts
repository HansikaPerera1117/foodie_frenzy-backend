import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleDestroy,
} from '@nestjs/common';
// import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
// import { AuthModule } from './auth/auth.module';
import databaseConfig from './database/config/database.config';
// import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
// import mailConfig from './mail/config/mail.config';
import fileConfig from './files/config/file.config';

import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { HeaderResolver } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
// import { MailModule } from './mail/mail.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AllConfigType } from './config/config.type';
import { MongooseModule } from '@nestjs/mongoose';
// import { MongooseConfigService } from './database/mongoose-config.service';
import { DatabaseConfig } from './database/config/database-config.type';
import { StaffModule } from './staff/staff.module';
import { AuthModule } from './auth-management/auth/auth.module';
import { UserModule } from './user/user.module';
import { RedisModule } from './services/redis/redis.module';
import { FirebaseModule } from './services/firebase/firebase.module';
import { TransactionModule } from './transaction/transaction.module';
import { RoleModule } from './role-permission-management/role/role.module';
import { CustomerModule } from './customer/customer.module';
import { PermissionModule } from './role-permission-management/permission/permission.module';
import { CategoryModule } from './product-management/category/category.module';
import { CacheMiddleware } from './utils/common/middleware/cache/cache.middleware';
import { CleanupService } from './cleanup.service';
import redisConfig from './services/redis/config/redis.config';
import { CacheModule } from './utils/common/middleware/cache/cache.module';
import { ProductModule } from './product-management/product/product.module';
import { RolePermissionModule } from './role-permission-management/role-permission/role-permission.module';
import { ReviewModule } from './review/review.module';
import { CartModule } from './cart/cart.module';

import { StockModule } from './stock/stock.module';

import { PaymentModule } from './payment/payment.module';
import { MailModule } from './mail/mail.module';
import { SendgridModule } from './services/sendgrid/sendgrid.module';

import { StoreLocatorModule } from './store-locator/store-locator.module';
import { SeylanMastercardModule } from './services/payment-gateways/seylan-mastercard/seylan-mastercard.module';
import { TestModule } from './services/payment-gateways/test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        // authConfig,
        appConfig,
        // mailConfig,
        fileConfig,
        redisConfig,
      ],
      envFilePath: ['.env'],
    }),
    // (databaseConfig() as DatabaseConfig).isDocumentDatabase
    //   ? MongooseModule.forRootAsync({
    //       useClass: MongooseConfigService,
    //     })
    //   :
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    FilesModule,
    StaffModule,
    AuthModule,
    UserModule,
    RedisModule,
    FirebaseModule,
    TransactionModule,
    RoleModule,
    CustomerModule,
    PermissionModule,
    CategoryModule,
    CacheModule,
    ProductModule,

    RolePermissionModule,
    ReviewModule,
    CartModule,
    StockModule,
    PaymentModule,
    MailModule,
    SendgridModule,
    StoreLocatorModule,
    SeylanMastercardModule,
    TestModule,
  ],
  providers: [CleanupService, CacheMiddleware],
  exports: [CleanupService],
  controllers: [],
})
export class AppModule implements NestModule, OnModuleDestroy {
  constructor(private readonly cleanupService: CleanupService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CacheMiddleware).forRoutes('*');
  }
  onModuleDestroy() {
    this.cleanupService.destroy();
  }
}
