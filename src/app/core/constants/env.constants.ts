import { ConfigService } from "@nestjs/config";

import {
  EnvSchemaType,
  NodeEnvironment,
} from "../config/env-validation.schema";

const configService = new ConfigService<EnvSchemaType, true>();

const PORT = configService.get<number>("PORT");

const NODE_ENV = configService.get<NodeEnvironment>("NODE_ENV");

const REDIS_CONNECTION_STRING = configService.get<string>(
  "REDIS_CONNECTION_STRING",
);

const BASE_URL = configService.get<string>("BASE_URL");

export { PORT, NODE_ENV, REDIS_CONNECTION_STRING, BASE_URL };
