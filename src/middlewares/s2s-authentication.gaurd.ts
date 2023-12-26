import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { s2sHeaderName } from '../utils/common-constant';

@Injectable()
export default class S2sAuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();

      const token = request.headers[s2sHeaderName];

      if (!token) {
        return false;
      }

      const s2sTokenInEnv = String(process.env.S2S_TOKEN);

      if (s2sTokenInEnv !== token) {
        return false;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
