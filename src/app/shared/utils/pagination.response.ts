import { PaginationRequest } from "./pagination.request";

export class PaginatedResponse<T> {
  constructor(list: T[], itemCount: number, request?: PaginationRequest) {
    this.page = request?.page ?? 1;
    this.pageSize = request?.pageSize ?? 10;
    this.list = list;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.pageSize);
  }

  page: number;

  pageSize: number;

  list: T[];

  itemCount: number;

  pageCount: number;

  get hasNextPage(): boolean {
    return this.page < this.pageCount;
  }

  get hasPreviousPage(): boolean {
    return this.page > 1;
  }
}
