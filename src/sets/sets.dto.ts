import { SetType } from 'src/shared/types/setType.type';

export interface CardSetDto {
  name: string;
  type: SetType;
  uuid?: string;
}
