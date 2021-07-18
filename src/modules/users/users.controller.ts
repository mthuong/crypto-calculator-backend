import { JwtAuthGuard } from '@modules/auth/guard/jwt-auth.guard';
import { Controller, Get, UseGuards, Request } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
