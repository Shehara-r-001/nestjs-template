import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import argon2 from "argon2";

import { EnvSchemaType } from "@core/config/env-validation.schema";

/**
 * HashService provides methods for hashing and verifying secrets using Argon2.
 * It uses a pepper (stored in the environment) for additional security.
 */
@Injectable()
export class HashService {
  constructor(
    private configService: ConfigService<EnvSchemaType, true>,
    private logger: Logger,
  ) {}

  private readonly pepper = this.configService.get<string>("HASH_PEPPER");

  /**
   * Encrypts a secret using Argon2 with a pepper.
   * @param secret The plain-text secret to hash.
   * @returns The hashed secret.
   */
  async encrypt(secret: string) {
    try {
      return await argon2.hash(secret, {
        type: argon2.argon2i,
        secret: Buffer.from(this.pepper),
      });
    } catch (error) {
      this.logger.error("Error while encrypting");
      throw new Error(error);
    }
  }

  /**
   * Verifies a plain-text secret against a hashed secret.
   * @param hash The hashed secret.
   * @param secret The plain-text secret to verify.
   * @returns True if the secret matches the hash, false otherwise.
   */
  async verify(hash: string, secret: string) {
    try {
      return await argon2.verify(hash, secret, {
        secret: Buffer.from(this.pepper),
      });
    } catch (error) {
      this.logger.error("Error while verifying");
      throw new Error(error);
    }
  }
}
