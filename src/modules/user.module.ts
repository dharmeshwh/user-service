import { Module } from '@nestjs/common';
import { UserController } from '../routes/users/user.controller';
import { UserService } from '../routes/users/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
