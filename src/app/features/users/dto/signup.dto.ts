import { PickType } from "@nestjs/swagger";

import { User } from "../entities/user.entity";

export class SignUpDTO extends PickType(User, [
  "email",
  "username",
  "password",
]) {}
