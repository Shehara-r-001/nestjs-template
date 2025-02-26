import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "@features/users/users.service";
import { SignUpDTO } from "@features/users/dto/signup.dto";
import { ExceptionsService } from "@shared/services/exceptions.service";
import { HashService } from "@shared/services/encrypt.service";
import { excludeProperty } from "@shared/utils/general.utils";
import { SignInDTO } from "@features/users/dto/signin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly exceptionService: ExceptionsService,
    private readonly encryptService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDTO: SignUpDTO) {
    // ! need to implement rollback
    const isUserExist = await this.userService.isUserExist(signUpDTO.email);

    if (isUserExist)
      this.exceptionService.throwBadRequestError(
        "user with email already exist",
      );
    else {
      await this.userService.createUser({
        ...signUpDTO,
        password: await this.encryptService.encrypt(signUpDTO.password),
      });

      const newUser = await this.userService.findOneByEmail(signUpDTO.email);

      const payload = {
        sub: newUser.id,
        ...excludeProperty(newUser, ["password"]),
      };

      const token = await this.jwtService.signAsync(payload);

      // return {
      //   access_token: token,
      // };

      return { token };
    }
  }

  async login(signInDTO: SignInDTO) {
    const user = await this.userService.findOneByEmail(signInDTO.email);

    this.exceptionService.throwNotFoundError("user not found");

    const isMatch = await this.encryptService.verify(
      user.password,
      signInDTO.password,
    );

    if (!isMatch)
      throw new UnauthorizedException("email and password does not match");

    const payload = {
      sub: user.id,
      ...excludeProperty(user, ["password"]),
    };

    const token = await this.jwtService.signAsync(payload);

    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };

    return { token };
  }
}
