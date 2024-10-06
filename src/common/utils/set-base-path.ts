import { AxiosRequestConfig } from 'axios';

export type Route = Pick<AxiosRequestConfig, 'url' | 'method'>

export const setBasePath = (route: Route, basePath: string): Route =>
{
  return {
    ...route,
    url: `${basePath}/${route.url}`
  };
};
