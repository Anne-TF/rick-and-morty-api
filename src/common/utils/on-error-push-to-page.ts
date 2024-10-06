import { Router } from 'vue-router';
export const onErrorPushToPage = async(errorCode: string, paths: Record<string, string>, $router: Router) =>
{

  if (Object.keys(paths).includes(errorCode))
  {
    await $router.push(paths[errorCode]);
  }
};
