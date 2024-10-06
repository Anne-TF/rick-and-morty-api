import { Route } from '@common/utils/set-base-path';

export const setUriParams = (route: Route, params: object): Route =>
{

  const _route_ = { ...route };

  for (const key in params)
  {
    _route_.url = _route_.url.replace(`:${key}`, params[key]);
  }

  return _route_;
};
