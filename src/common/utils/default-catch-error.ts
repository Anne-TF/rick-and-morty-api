
export const defaultCatchError = async(err: any, context: any, ...args: any) =>
{
  return Promise.reject(err);
};
