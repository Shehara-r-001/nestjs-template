import { REDIS_CONNECTION_STRING } from "../../constants/env.constants";

const redisConfig = {
  connection: REDIS_CONNECTION_STRING,
  db: 0,
};

export { redisConfig };
