import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { databaseProviders } from './typeorm/configs/data-source';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [...databaseProviders, UserService],
  exports: [...databaseProviders],
})
export class UserModule {}
