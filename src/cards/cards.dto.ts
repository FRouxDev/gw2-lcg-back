import { CardSet } from 'src/sets/entities/sets.entities';
import { Sphere } from 'src/shared/types/sphere.type';

export interface CardDto {
  uuid?: string;
  name: string;
  set: CardSet;
  traits: string[];
  cardNumber?: number;
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
}

export interface LocationDto extends CardDto {
  unique: boolean;
  keywords: string[];
  questPoints: number;
  text: string;
  shadow: string;
  threat: number;
  victoryPoints?: number;
}

export interface TreacheryDto extends CardDto {
  keywords: string[];
  text: string;
  shadow: string;
}

export interface QuestDto extends CardDto {
  text: string;
  questPoints: number;
  victoryPoints?: number;
}
