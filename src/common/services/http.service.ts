import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosRetry, { IAxiosRetryConfig } from 'axios-retry';
import configuration from '@config/configuration';
import { IQueryParams } from '@common/interfaces';


interface IHTTPBasicParams {
  http: AxiosInstance;
  config: AxiosRequestConfig;
}

export interface IRetryParams extends IHTTPBasicParams {
  retries: number,
  onCatchError?: (params: ICatchErrorParams) => Promise<void>
  error?: AxiosError | any
  retryCondition?: (err: AxiosError | any) => boolean;
}

export interface ICatchErrorParams extends IHTTPBasicParams {
  error: AxiosError | any
};


export interface IRequestParams<u = any> extends Partial<Omit<IRetryParams, 'http' | 'error'>>{
  queryParams?: IQueryParams;
  token?: string | null;
}

export class HTTP
{

  static create()
  {
    const { withCredentials, useSSL, host, port  } = configuration().server;

    return axios.create({
      baseURL: `${useSSL ? 'https://' : 'http://'}${host}${port ? `:${port}` : ''}`,
      withCredentials
    });
  }

  static getDefaultOptions(
    config: AxiosRequestConfig,
    token?: string)
  {
    if (token)
    {
      const headers = config.headers || {};
      Object.assign(headers, { Authorization: `Bearer ${token}` });
      config.headers = headers;
    }
    return {
      method: 'GET',
      ...config,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      }
    };
  }

  static getParams(queryParams?: IQueryParams)
  {
    if (!queryParams)
    {
      return null;
    }
    const params = new URLSearchParams();
    if (queryParams?.filter)
    {
      Object.keys(queryParams?.filter).forEach((key) =>
      {
        if (
          (key === 'startDate' || key === 'endDate') &&
          !queryParams?.filter[key]
        )
        {
          return;
        }
        params.append(`filter[${key}]`, queryParams?.filter[key]);
        if (key === 'partialRemoved')
        {
          params.append('filter[withPartialRemoved]', 'true');
        }
      });
    }

    if (queryParams?.pagination)
    {
      if (queryParams?.pagination?.limit)
      {
        params.set('pagination[limit]', queryParams?.pagination?.limit?.toString());
      }
      if (
        queryParams?.pagination?.offset !== undefined &&
        queryParams?.pagination?.offset !== null
      )
      {
        params.set('pagination[offset]', queryParams?.pagination?.offset?.toString());
      }
    }

    if (queryParams?.limit)
    {
      params.set('limit', queryParams?.limit?.toString());
    }
    if (queryParams?.offset !== undefined && queryParams?.offset !== null)
    {
      params.set('offset', queryParams?.offset?.toString());
    }

    if (queryParams?.sort && queryParams?.sortOrder)
    {
      params.set(`sort[${queryParams?.sort}]`, queryParams?.sortOrder ? 'asc' : 'desc');
    }

    Object.keys(queryParams).forEach((key) =>
    {
      if (['filter', 'pagination', 'limit', 'offset', 'sort', 'sortOrder'].includes(key))
      {
        return;
      }
      if (
        queryParams[key] === '' ||
        queryParams[key] === null ||
        queryParams[key] === undefined
      )
      {
        return;
      }
      params.append(key, queryParams[key]);
    });

    return params;
  }


  static async retry({ http, config,  retries, error, onCatchError, retryCondition }: IRetryParams)
  {
    if (error && onCatchError)
    {
      await onCatchError({ http, config, error });
    }

    const retryConfig: IAxiosRetryConfig = {
      retries,
      retryDelay: (retryCount) => retryCount * 1000
    };

    if (retryCondition)
    {
      Object.assign(retryConfig, { retryCondition });
    }

    axiosRetry(http, retryConfig);

    return http.request(this.getDefaultOptions(config));
  }

  static async request<T>({ config, queryParams, token, retries, retryCondition, onCatchError }: IRequestParams): Promise<AxiosResponse<T>>
  {
    const http: AxiosInstance = this.create();
    const params: URLSearchParams = this.getParams(queryParams);
    const options: any = this.getDefaultOptions(config, token);

    const _config: AxiosRequestConfig = {
      ...options,
      params
    };

    let response: any;

    try
    {
      response = await http.request(_config);
    }
    catch (error: AxiosError | any)
    {
      if (!retries)
      {
        throw error;
      }

      response = this.retry({ http, config, error, retries, retryCondition, onCatchError });
    }

    return response;
  }

}
