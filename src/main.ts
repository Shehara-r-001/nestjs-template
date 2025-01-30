import { NestFactory } from "@nestjs/core";
import {
  ConsoleLogger,
  Logger,
  ValidationPipe,
  VersioningType,
} from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";

import { AppModule } from "./app.module";
import { ResponseInterceptor } from "./app/core/interceptors/response.interceptor";
import { ErrorFilter } from "./app/core/filters/errors.filter";
import { BASE_URL, NODE_ENV, PORT } from "./app/core/constants/env.constants";
import { NodeEnvironment } from "./app/core/config/env-validation.schema";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      colors: true,
      logLevels: ["error", "fatal", "log", "warn"],
      prefix: "NEST_TEMPLATE", // change this to app name
    }),
  });

  app.use(helmet());

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix("api");

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: "v",
    defaultVersion: "1",
  });

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalFilters(new ErrorFilter());

  const config = new DocumentBuilder()
    .setTitle("Nest Template")
    .setDescription("API description")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("nest")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, documentFactory);

  await app.listen(PORT);

  Logger.log(`NODE_ENV = ${NODE_ENV}`);
  Logger.log(
    NODE_ENV === NodeEnvironment.LOCAL &&
      `Server is listening on ${BASE_URL}:${PORT}/api/v1`,
  );
  Logger.log(
    NODE_ENV === NodeEnvironment.LOCAL &&
      `Check the API docs on ${BASE_URL}:${PORT}/api-docs`,
  );
}
bootstrap().catch((e) => Logger.error(e));
