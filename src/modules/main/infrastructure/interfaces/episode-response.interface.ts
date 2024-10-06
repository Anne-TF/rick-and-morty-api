import { IAPIResponse } from '@common/interfaces';


export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
};

export interface IGetEpisode extends IAPIResponse<IEpisode> {}
