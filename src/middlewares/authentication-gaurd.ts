import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { UserEntity } from '../typeorm/entities/user.entity';
import { EUserTypes, headerName } from '../utils/common-constant';
import { verifyToken } from './token-handler';

@Injectable()
export default class AuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();

      const token = request.headers[headerName];

      if (!token) {
        return false;
      }

      const { userId } = await verifyToken(token);

      const user = await UserEntity.findOne({
        where: {
          id: userId,
          type: EUserTypes.DEFAULT,
        },
        select: ['id', 'type'],
      });

      if (!user) {
        return false;
      }

      request[`user`] = {
        userId,
      };

      return true;
    } catch (error: any) {
      Logger.error(error.message);
      return false;
    }
  }
}
