import { HTTP } from '@common/services';
import { AxiosRequestConfig } from 'axios';
import mainRoutes from '@modules/main/infrastructure/routes';
import configuration from '@config/configuration';
import { setBasePath } from '@common/utils';
import { IListOptionsSchema } from '@common/schemas';
import { IListCharacterResponse } from '@modules/main/infrastructure/interfaces';
import { IGetEpisode } from '@modules/main/infrastructure/interfaces/episode-response.interface';

export class MainGateway
{
  private static routes = mainRoutes;
  private static basePath =  configuration().server.basePath;

  static async listCharacters(queryParams: IListOptionsSchema)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath(this.routes.list, this.basePath)
    };

    return HTTP.request<IListCharacterResponse>({ config, queryParams });
  }

  static async getEpisode(id: number)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath({
        ...this.routes.getEpisode,
        url: this.routes.getEpisode.url.replace(':id', id.toString())
      }, this.basePath)
    };

    return HTTP.request<IGetEpisode>({ config });
  }
}

