import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { databaseProviders } from '../typeorm/configs/data-source';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
