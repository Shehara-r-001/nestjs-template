import Joi, { SchemaMap } from "joi";

enum NodeEnvironment {
  LOCAL = "local",
  DEV = "dev",
  PROD = "prod",
}

const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...Object.values(NodeEnvironment))
    .default(NodeEnvironment.DEV),
  PORT: Joi.number().default(3000),
  BASE_URL: Joi.string().default("http://127.0.0.1"),
  REDIS_CONNECTION_STRING: Joi.string().required(), // make this optional or remove it if caching is not used
});

type EnvSchemaType = {
  NODE_ENV: NodeEnvironment;
  PORT: number;
  BASE_URL: string;
  REDIS_CONNECTION_STRING: string;
};

export { envValidationSchema, NodeEnvironment, EnvSchemaType };
