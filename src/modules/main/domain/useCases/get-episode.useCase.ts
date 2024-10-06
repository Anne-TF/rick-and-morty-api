import { NotifyFn } from '@common/utils';
import { AxiosError } from 'axios';
import { MainGateway } from '@modules/main/infrastructure/gateways';
import { NotificationEnum } from '@common/enums/notification.enum';

export class GetEpisodeUseCase
{
  static async handle(id: number)
  {
    try
    {
      return (await MainGateway.getEpisode(id))?.data;
    }
    catch (err: AxiosError | any)
    {
      NotifyFn(
        NotificationEnum.ERROR,
        '¡Ha ocurrido un error!',
        5000,
        'Lo sentimos mucho, no pudimos obtener los episodios de este personaje.'
      );
    }
  }
}
