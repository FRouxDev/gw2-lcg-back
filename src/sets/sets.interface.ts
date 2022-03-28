import { SetType } from './entities/sets.entities';

export interface CardSetInterface {
  uuid: string;
  name: string;
  type: SetType;
}
