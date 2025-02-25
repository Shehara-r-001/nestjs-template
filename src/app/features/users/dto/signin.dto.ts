import { PickType } from "@nestjs/swagger";

import { SignUpDTO } from "./signup.dto";

export class SignInDTO extends PickType(SignUpDTO, ["email", "password"]) {}
