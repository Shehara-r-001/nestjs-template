import { Module } from "@nestjs/common";

import { FeaturesModule } from "./app/features/features.module";
import { ConfigModule } from "./app/core/config/config.module";

@Module({
  imports: [FeaturesModule, ConfigModule], // redisModule
  controllers: [],
  providers: [],
})
export class AppModule {}
