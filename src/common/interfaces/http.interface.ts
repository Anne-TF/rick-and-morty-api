import { AxiosRequestConfig } from 'axios';

export interface IPaginationParams {
  limit: string | number | null;
  offset?: string | number | null;
}

export interface IQueryParams {
  filter?: object
  pagination?: IPaginationParams;
  limit?: string | number | null;
  offset?: string | number | null;
  sort?: string;
  sortOrder?: boolean;
}

export interface IHttpServiceParams<u = any> {
  config: AxiosRequestConfig;
  queryParams?: IQueryParams;
  user?: u | null;
  token?: string | null;
  headers?: object;
  retries?: number
}
