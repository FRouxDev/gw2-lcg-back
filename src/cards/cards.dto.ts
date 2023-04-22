import { CardSet } from 'src/sets/entities/sets.entities';
import { CardSetDto } from 'src/sets/sets.dto';
import { Sphere } from 'src/shared/types/sphere.type';

export interface SimplifiedCardDto {
  uuid: string;
  name: string;
  sphere?: Sphere;
  set: CardSet | CardSetDto;
  cardNumber?: number;
  type: string;
}

export interface CardDto {
  uuid?: string;
  name: string;
  set: CardSet | CardSetDto;
  traits: string[];
  cardNumber?: number;
  cardImage?: string;
  type: string;
}

export interface HeroDto extends CardDto {
  unique: boolean;
  sphere: Sphere;
  keywords: string[];
  threat: number;
  text?: string;
  willpower: number;
  attack: number;
  defense: number;
  health: number;
}

export interface AllyDto extends CardDto {
  unique: boolean;
  sphere: Sphere;
  keywords: string[];
  cost: number;
  text: string;
  willpower: number;
  attack: number;
  defense: number;
  health: number;
}

export interface EventDto extends CardDto {
  sphere: Sphere;
  keywords: string[];
  cost: number;
  text: string;
}

export interface AttachmentDto extends CardDto {
  unique: boolean;
  sphere: Sphere;
  keywords: string[];
  cost: number;
  text: string;
}

export interface EnemyDto extends CardDto {
  unique: boolean;
  keywords: string[];
  engagement: number;
  text: string;
  shadow: string;
  threat: number;
  attack: number;
  defense: number;
  health: number;
  victoryPoints?: number;
  quantity: number;
}

export interface LocationDto extends CardDto {
  unique: boolean;
  keywords: string[];
  questPoints: number;
  text: string;
  shadow: string;
  threat: number;
  victoryPoints?: number;
  quantity: number;
}

export interface TreacheryDto extends CardDto {
  keywords: string[];
  text: string;
  shadow: string;
  quantity: number;
}

export interface QuestDto extends CardDto {
  text: string;
  sideText?: string;
  sideCardImage?: string;
  questPoints: number;
  victoryPoints?: number;
  number: number;
}

export interface ObjectiveDto extends CardDto {
  text: string;
  keywords: string[];
}

export interface ObjectiveAllyDto extends CardDto {
  unique: boolean;
  keywords: string[];
  text: string;
  willpower: number;
  attack: number;
  defense: number;
  health: number;
}
