import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";

import { DATA_SOURCE } from "@core/constants/db.constants";
import { EnvSchemaType } from "../env-validation.schema";
import { User } from "@features/users/entities/user.entity";

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const configServise = new ConfigService<EnvSchemaType, true>();
      const dataSource = new DataSource({
        url: configServise.get("DB_CONNECTION_URL"),
        type: "postgres",
        // driver: 'pg',
        // entities: [],
        // entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        entities: [User],
        synchronize: true,
        logging: false,
        entityPrefix: "temp_",
      });

      return dataSource.initialize();
    },
  },
];
