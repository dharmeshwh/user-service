import { Injectable } from '@nestjs/common';
import HttpResponse from '../../libs/http-response';
import { UserEntity } from '../../typeorm/entities/user.entity';

@Injectable()
export class S2sService {
  async getUserDetails(id: string) {
    try {
      const user = await UserEntity.findOne({
        where: [
          {
            id,
          },
          { username: id },
        ],
        select: ['username', 'email', 'id', 'type'],
      });

      if (!user) {
        return HttpResponse.notFound('user not found');
      }

      return HttpResponse.success(user);
    } catch (error: any) {
      return HttpResponse.error(error.message);
    }
  }
}
