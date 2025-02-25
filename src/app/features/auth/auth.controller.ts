import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { SignUpDTO } from "@features/users/dto/signup.dto";
import { SignInDTO } from "@features/users/dto/signin.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    type: SignUpDTO,
    description: "User login credentials",
  })
  @Post("signup")
  signup(@Body() signupDTO: SignUpDTO) {
    return this.authService.signUp(signupDTO);
  }

  @ApiBody({
    type: SignInDTO,
    description: "User login credentials",
  })
  @Post("signin")
  signin(@Body() signinDTO: SignInDTO) {
    return this.authService.login(signinDTO);
  }
}
