import { Logger, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { AuthService } from "./auth.service";
import { DatabaseModule } from "@core/config/db/database.module";
import { AuthController } from "./auth.controller";
import { UsersService } from "@features/users/users.service";
import { JwtStrategy } from "@core/stratergies/jwt.stratergy";
import { userProviders } from "@features/users/users.provider";
import { ExceptionsService } from "@shared/services/exceptions.service";
import { HashService } from "@shared/services/encrypt.service";
import { ConfigModule } from "@core/config/config.module";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "2 days" },
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
  ],
  providers: [
    AuthService,
    UsersService,
    JwtStrategy,
    ExceptionsService,
    HashService,
    Logger,
    ...userProviders,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
