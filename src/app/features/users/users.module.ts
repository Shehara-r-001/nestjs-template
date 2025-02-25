import { Logger, Module } from "@nestjs/common";

import { UsersService } from "./users.service";
import { DatabaseModule } from "@core/config/db/database.module";
import { userProviders } from "./users.provider";
import { ExceptionsService } from "@shared/services/exceptions.service";

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ExceptionsService, Logger, ...userProviders],
  exports: [UsersService],
})
export class UsersModule {}
