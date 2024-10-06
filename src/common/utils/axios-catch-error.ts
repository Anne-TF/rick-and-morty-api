import { AxiosError } from 'axios';
import { onErrorPushToPage } from '@common/utils';
import configuration from '@config/configuration';
import { $globalRoute } from 'app/src/router';

export const axiosCatchError = async(err: AxiosError, context: any, ...args: any) =>
{
  const errorCode = err.response.data['errorCode'];
  await onErrorPushToPage(errorCode, configuration().onErrorPath, $globalRoute);

  return Promise.reject(err);
};
