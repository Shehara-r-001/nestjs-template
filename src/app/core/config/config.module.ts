import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";

import { envValidationSchema } from "./env-validation.schema";

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema, // eslint-disable-line
    }),
  ],
})
export class ConfigModule {}
