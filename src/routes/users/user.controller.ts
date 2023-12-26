import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { handleHTTPResponse } from '../../libs/http-response';
import { UserEntity } from '../../typeorm/entities/user.entity';
import {
  createUserContract,
  deleteUserContract,
  getUsersContract,
} from './user.contract';
import { IDeleteUser, IGetUsers } from './user.interface';
import { UserService } from './user.service';
import Vp from '../../utils/joi-validation';
import AuthenticationGuard from '../../middlewares/authentication-gaurd';
import { Auth } from '../../utils/decorator/auth.decorator';
import { IVerifyTokenResponse } from '../../middlewares/token-handler';
import AdminAuthenticationGuard from '../../middlewares/admin-authentication-gaurd';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthenticationGuard)
  async findOne(@Auth() auth: IVerifyTokenResponse) {
    const res = this.userService.findOne(auth.userId);
    return handleHTTPResponse(res);
  }

  @Get()
  @UseGuards(AdminAuthenticationGuard)
  async findAll(@Query(Vp.for(getUsersContract)) query: IGetUsers) {
    const res = this.userService.findAll(query);
    return handleHTTPResponse(res);
  }

  @Post()
  @UseGuards(AdminAuthenticationGuard)
  async create(@Body(Vp.for(createUserContract)) user: Partial<UserEntity>) {
    const res = this.userService.create(user);
    return handleHTTPResponse(res);
  }

  @Delete(':id')
  @UseGuards(AdminAuthenticationGuard)
  async remove(@Param(Vp.for(deleteUserContract)) param: IDeleteUser) {
    const res = this.userService.remove(param.id);
    return handleHTTPResponse(res);
  }
}
