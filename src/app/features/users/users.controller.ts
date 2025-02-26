import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiCookieAuth, ApiTags } from "@nestjs/swagger";

import { UsersService } from "./users.service";
import { JwtGuard } from "@core/guards/jwt.guard";
import { currentUser } from "@core/decorators/user.decorator";
import { User } from "./entities/user.entity";

@ApiCookieAuth("access_token")
@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get()
  testUser(@currentUser() user: User | null) {
    return user;
  }
}
