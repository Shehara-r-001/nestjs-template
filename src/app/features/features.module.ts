import { Module } from "@nestjs/common";

import { HelloModule } from "./hello/hello.module";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [HelloModule, AuthModule, UsersModule],
})
export class FeaturesModule {}
