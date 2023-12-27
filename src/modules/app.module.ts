import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { databaseProviders } from '../typeorm/configs/data-source';
import { S2sModule } from './s2s.module';

@Module({
  imports: [UserModule, S2sModule],
  controllers: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
