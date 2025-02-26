import { Logger, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "./users.service";
import { DatabaseModule } from "@core/config/db/database.module";
import { userProviders } from "./users.provider";
import { ExceptionsService } from "@shared/services/exceptions.service";
import { UsersController } from "./users.controller";

@Module({
  imports: [DatabaseModule],
  providers: [
    UsersService,
    ExceptionsService,
    Logger,
    ...userProviders,
    JwtService,
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
