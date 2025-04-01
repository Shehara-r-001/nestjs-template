import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";

export enum SortType {
  ASC = "ASC",
  DESC = "DESC",
}

export class PaginationRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({ description: "page number" })
  page = 1;

  @IsOptional()
  @IsInt()
  @Min(5)
  @Type(() => Number)
  @ApiProperty({ description: "page size" })
  pageSize = 10;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "sort column name" })
  sortBy: string = "";

  @IsOptional()
  @IsString()
  @IsEnum(SortType)
  @ApiProperty({
    description: "sort type",
    enum: SortType,
    default: SortType.ASC,
  })
  sortType: SortType = SortType.ASC;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "search query" })
  query: string;

  @IsOptional()
  @Type(() => Object)
  @ApiProperty({ description: "filters" })
  filters: Record<string, any>;
}
