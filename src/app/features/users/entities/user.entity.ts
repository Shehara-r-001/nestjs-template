import { Column, Entity } from "typeorm";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { BaseEntity } from "@shared/entities/base-entity.entity";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  MODERATOR = "mod",
  GUEST = "guest",
}

@Entity()
export class User extends BaseEntity {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Column({ type: "varchar", length: 100 })
  @ApiProperty({ example: "John", description: "The first name of the user" })
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Column({ type: "varchar", length: 100 })
  @ApiProperty({ example: "Doe", description: "The last name of the user" })
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Column({ type: "varchar", length: 50 })
  @ApiProperty({ example: "johndoe", description: "The username of the user" })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  @Column({ type: "varchar", length: 255, unique: true })
  @ApiProperty({
    example: "john.doe@example.com",
    description: "The email address of the user",
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  @Column({ type: "varchar", length: 1000 })
  @ApiProperty({
    example: "password123",
    description: "The password of the user",
  })
  password: string;

  @IsNotEmpty()
  @IsEnum(UserRole, { message: "Invalid user role" })
  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  @ApiProperty({
    enum: UserRole,
    default: UserRole.USER,
    example: UserRole.GUEST,
    description: "Role of the user",
  })
  role: string;
}
