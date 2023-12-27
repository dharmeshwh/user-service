import { Injectable } from '@nestjs/common';
import HttpResponse from '../../libs/http-response';
import { UserEntity } from '../../typeorm/entities/user.entity';
import { EUserTypes } from '../../utils/common-constant';
import { IGetUsers } from './user.interface';

@Injectable()
export class UserService {
  async findOne(id: string) {
    try {
      const user = await UserEntity.findOne({
        where: {
          id,
        },
        select: ['username', 'email', 'id'],
      });

      if (!user) {
        return HttpResponse.notFound('user not found!');
      }

      return HttpResponse.success(user);
    } catch (error: any) {
      return HttpResponse.error(error.message);
    }
  }

  async findAll(query: IGetUsers) {
    try {
      const { page = 1, take = 50 } = query;

      const skip = (page - 1) * take;

      const users = await UserEntity.find({
        where: {
          type: EUserTypes.DEFAULT,
        },
        take,
        skip,
        select: ['username', 'email', 'id'],
      });

      return HttpResponse.success(users);
    } catch (error: any) {
      return HttpResponse.error(error.message);
    }
  }

  async create(user: Partial<UserEntity>) {
    try {
      const isUserExists = await UserEntity.findOne({
        where: [
          {
            username: user.username,
          },
          {
            email: user.email,
          },
        ],
        select: ['id'],
      });

      if (isUserExists) {
        return HttpResponse.error(
          `user already exists with this ${
            isUserExists.username === user.username ? 'username' : 'email'
          }!`,
        );
      }

      await UserEntity.save(user);

      return HttpResponse.created(null);
    } catch (error: any) {
      return HttpResponse.error(error.message);
    }
  }

  async remove(id: string) {
    try {
      const isUserExists = await UserEntity.findOne({
        where: {
          id,
        },
        select: ['id'],
      });

      if (!isUserExists) {
        return HttpResponse.notFound('user not found!');
      }

      await UserEntity.delete({
        id,
      });

      return HttpResponse.success('user deleted');
    } catch (error: any) {
      return HttpResponse.error(error.message);
    }
  }
}
