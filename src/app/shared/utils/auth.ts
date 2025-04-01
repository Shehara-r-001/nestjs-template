import { ForbiddenException, UnauthorizedException } from "@nestjs/common";

import { User } from "@features/users/entities/user.entity";

/**
 * ensures the requested user is an admin, otherwise throws an exception.
 * @param user user who requests to perform an action
 */
const checkIsAdmin = (user: User | null): never | void => {
  if (!user) throw new UnauthorizedException("User not found");

  if (user.role !== "admin")
    throw new ForbiddenException("Must be an admin to perform this action");
};

/**
 * ensures the requested user is the owner, otherwise throws an exception.
 * @param user user who requests to perform an action
 * @param owner owner of the record that user request to perform the action
 */
const checkIsOwner = (user: User | null, owner: User): never | void => {
  if (!user) throw new UnauthorizedException("User not found");

  if (user.id !== owner.id || user.role === "admin")
    throw new ForbiddenException(
      "Must be the owner or the admin to perform this action",
    );
};

export { checkIsAdmin, checkIsOwner };
