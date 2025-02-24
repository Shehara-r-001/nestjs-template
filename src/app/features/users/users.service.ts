import { Inject, Injectable } from "@nestjs/common";
import { Repository, SelectQueryBuilder } from "typeorm";

import { USER_REPOSITORY } from "@core/constants/repository.constants";
import { User } from "./entities/user.entity";
import { SignUpDTO } from "./dto/signup.dto";
import { ExceptionsService } from "@shared/services/exceptions.service";

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
    private readonly exceptionService: ExceptionsService,
  ) {}

  async createUser(signUpDTO: SignUpDTO): Promise<boolean> {
    return await this.userRepository.manager.transaction(async (manager) => {
      await manager.save(User, {
        ...signUpDTO,
      });

      return true;
    });
  }

  /**
   * returns true if the user (with given email) exists
   * @param email
   * @returns
   */
  async isUserExist(email: string): Promise<boolean> {
    const count = await this.userRepository.countBy({ email });

    return count > 0;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ["Company"],
    });

    this.exceptionService.throwNotFoundError(user);

    return user;
  }

  async findOneByUserId(user: User | null, id: string): Promise<User> {
    const qb = this.getQueryBuilder(user, 0);

    const foundUser = await qb.where("user.id = :id", { id }).getOne();

    this.exceptionService.throwNotFoundError(foundUser);

    return foundUser; // should return User
  }

  /**
   * use to build a common query builder
   * @param _user
   * @param queryLevel use to manage data population
   * @returns
   */
  private getQueryBuilder(
    _user: User | null,
    queryLevel = 0,
  ): SelectQueryBuilder<User> {
    const qb = this.userRepository.createQueryBuilder("user");

    if (queryLevel > 0) {
      // populate data
    }

    return qb;
  }
}
