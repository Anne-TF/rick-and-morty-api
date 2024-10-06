import { NotifyFn } from '@common/utils';
import { AxiosError } from 'axios';
import { IFilterOptions } from '@modules/main/infrastructure/interfaces';
import { MainGateway } from '@modules/main/infrastructure/gateways';
import { NotificationEnum } from '@common/enums/notification.enum';

export class ListCharacterUseCase
{
  static async handle(queryParams: IFilterOptions)
  {
    try
    {
      return (await MainGateway.listCharacters(queryParams))?.data;
    }
    catch (err: AxiosError | any)
    {
      if (err.response.data.error === 'There is nothing here')
      {
        return { results: [], info: { pages: 0, count: 0 } };
      }
      NotifyFn(
        NotificationEnum.ERROR,
        '¡Ha ocurrido un error!',
        5000,
        'Lo sentimos mucho. Intentalo más tarde'
      );
      return { results: [], info: { pages: 0, count: 0 } };
    }
  }
}
