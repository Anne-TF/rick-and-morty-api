import { IAPIResponse, IPagination } from '@common/interfaces';

interface IOrigin {
  name: string;
  url: string;
}

interface ILocation {
  name: string;
  url: string;
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: IOrigin;
  location: ILocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface IListCharacterResponse extends IAPIResponse<{
  info: IPagination,
  results: ICharacter[];
}> {}
