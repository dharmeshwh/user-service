import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { handleHTTPResponse } from '../../libs/http-response';
import S2sAuthenticationGuard from '../../middlewares/s2s-authentication.gaurd';
import { S2sService } from './s2s.service';

@Controller('s2s') // Service to Service routes
@UseGuards(S2sAuthenticationGuard)
export class S2sController {
  constructor(private readonly s2sService: S2sService) {}

  @Get('profile/:username') // route to get user profile by username
  getUserDetails(@Param('username') username: string) {
    const res = this.s2sService.getUserDetails(username);
    return handleHTTPResponse(res);
  }

  @Get('user/:id') // route to get user profile by username
  getUserById(@Param('id') id: string) {
    const res = this.s2sService.getUserDetails(id);
    return handleHTTPResponse(res);
  }
}
