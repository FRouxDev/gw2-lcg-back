import { Card } from 'src/cards/entities/cards.entity';
import { SetType } from 'src/shared/types/setType.type';

export interface CardSetDto {
  name: string;
  type: SetType;
  uuid?: string;
}

export interface PublicCardSetDto {
  uuid: string;
  type: SetType;
  name: string;
  cards: Card[];
}
