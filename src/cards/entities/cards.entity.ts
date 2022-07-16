import { CardSet } from 'src/sets/entities/sets.entities';
import { Entity, Column, TableInheritance, ManyToOne, PrimaryColumn, ChildEntity } from 'typeorm';
import { Sphere } from 'src/shared/types/sphere.type';
@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Card {
  @PrimaryColumn()
  uuid: string;

  @Column()
  name: string;

  @ManyToOne(() => CardSet, (cardSet) => cardSet.cards, { onDelete: 'CASCADE' })
  set: CardSet;

  @Column('text', { array: true })
  traits: string[];

  @Column({ nullable: true })
  cardNumber: number;

  @Column()
  type: string;

  constructor() {}
}

@ChildEntity()
export class Hero extends Card {
  @Column({ nullable: true })
  unique: boolean;

  @Column({
    type: 'enum',
    enum: Sphere,
  })
  sphere: Sphere;

  @Column('text', { array: true })
  keywords: string[];

  @Column({ nullable: true })
  threat: number;

  @Column({ nullable: true })
  text: string;

  @Column({ nullable: true })
  willpower: number;

  @Column({ nullable: true })
  attack: number;

  @Column({ nullable: true })
  defense: number;

  @Column({ nullable: true })
  health: number;
}

@ChildEntity()
export class Ally extends Card {
  @Column({ nullable: true })
  unique: boolean;

  @Column({
    type: 'enum',
    enum: Sphere,
  })
  sphere: Sphere;

  @Column('text', { array: true })
  keywords: string[];

  @Column({ nullable: true })
  cost: number;

  @Column({ nullable: true })
  text: string;

  @Column({ nullable: true })
  willpower: number;

  @Column({ nullable: true })
  attack: number;

  @Column({ nullable: true })
  defense: number;

  @Column({ nullable: true })
  health: number;
}

@ChildEntity()
export class Event extends Card {
  @Column({
    type: 'enum',
    enum: Sphere,
  })
  sphere: Sphere;

  @Column('text', { array: true })
  keywords: string[];

  @Column({ nullable: true })
  cost: number;

  @Column({ nullable: true })
  text: string;
}

@ChildEntity()
export class Attachment extends Card {
  @Column({ nullable: true })
  unique: boolean;

  @Column({
    type: 'enum',
    enum: Sphere,
  })
  sphere: Sphere;

  @Column('text', { array: true })
  keywords: string[];

  @Column({ nullable: true })
  cost: number;

  @Column({ nullable: true })
  text: string;
}

@ChildEntity()
export class Enemy extends Card {
  @Column({ nullable: true })
  unique: boolean;

  @Column('text', { array: true })
  keywords: string[];

  @Column({ nullable: true })
  engagement: number;

  @Column({ nullable: true })
  text: string;

  @Column({ nullable: true })
  shadow: string;

  @Column({ nullable: true })
  threat: number;

  @Column({ nullable: true })
  attack: number;

  @Column({ nullable: true })
  defense: number;

  @Column({ nullable: true })
  health: number;

  @Column({ nullable: true })
  victoryPoints: number;

  @Column({ nullable: true })
  quantity: number;
}

@ChildEntity()
export class Location extends Card {
  @Column({ nullable: true })
  unique: boolean;

  @Column('text', { array: true })
  keywords: string[];

  @Column({ nullable: true })
  questPoints: number;

  @Column({ nullable: true })
  text: string;

  @Column({ nullable: true })
  shadow: string;

  @Column({ nullable: true })
  threat: number;

  @Column({ nullable: true })
  victoryPoints: number;

  @Column({ nullable: true })
  quantity: number;
}

@ChildEntity()
export class Treachery extends Card {
  @Column('text', { array: true })
  keywords: string[];

  @Column({ nullable: true })
  text: string;

  @Column({ nullable: true })
  shadow: string;

  @Column({ nullable: true })
  quantity: number;
}

@ChildEntity()
export class Quest extends Card {
  @Column({ nullable: true })
  text: string;

  @Column({ nullable: true })
  questPoints: number;

  @Column({ nullable: true })
  victoryPoints: number;

  @Column({ nullable: true })
  quantity: number;
}
