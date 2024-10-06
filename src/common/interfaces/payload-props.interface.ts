export interface IPayloadProps<T = Record<string, any>> {
  baseUrl?: string;
  user?: any | null;
  token?: string | null;
  queryParams?: any;
  id?: string;
  data?: T;
  slug?: any;
  isDelete?: boolean;
  status?: boolean;
  metricType?: string;
}
