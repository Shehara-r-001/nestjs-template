import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import {
  ThrottlerModule as NestThrottlerModule,
  ThrottlerGuard,
} from "@nestjs/throttler";

@Module({
  imports: [
    NestThrottlerModule.forRoot([
      {
        ttl: 60, // time to live in seconds (time window)
        limit: 10, // maximum number of requests allowed within the TTL
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // use the ThrottlerGuard globally
    },
  ],
})
export class ThrottlerModule {}
