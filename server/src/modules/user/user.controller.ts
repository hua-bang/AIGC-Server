import { Controller, Get, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { GetToken } from 'src/commons/decorators/get-jwt.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getInfo')
  getUserInfo(@GetToken() token: string) {
    return this.userService.getUserInfo(token);
  }
}
