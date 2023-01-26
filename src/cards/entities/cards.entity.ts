import { CardSet } from 'src/sets/entities/sets.entities';
import { Entity, Column, TableInheritance, ManyToOne, PrimaryColumn, ChildEntity } from 'typeorm';
import { Sphere } from 'src/shared/types/sphere.type';
@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Card {
  @PrimaryColumn()
  uuid: string;

  @ManyToOne(() => CardSet, (cardSet) => cardSet.cards, { onDelete: 'CASCADE' })
  set: CardSet;

  @Column({ nullable: true })
  cardNumber: number;

  @Column()
  type: string;
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

  @Column({ nullable: true })
  threat: number;

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

  @Column({ nullable: true })
  cost: number;

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

  @Column({ nullable: true })
  cost: number;
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

  @Column({ nullable: true })
  cost: number;
}

@ChildEntity()
export class Enemy extends Card {
  @Column({ nullable: true })
  unique: boolean;

  @Column({ nullable: true })
  engagement: number;

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

  @Column({ nullable: true })
  questPoints: number;

  @Column({ nullable: true })
  threat: number;

  @Column({ nullable: true })
  victoryPoints: number;

  @Column({ nullable: true })
  quantity: number;
}

@ChildEntity()
export class Treachery extends Card {
  @Column({ nullable: true })
  quantity: number;
}

@ChildEntity()
export class Quest extends Card {
  @Column({ nullable: true })
  questPoints: number;

  @Column({ nullable: true })
  victoryPoints: number;

  @Column({ nullable: true })
  quantity: number;
}

@ChildEntity()
export class Objective extends Card {}

@ChildEntity()
export class ObjectiveAlly extends Card {
  @Column({ nullable: true })
  unique: boolean;

  @Column({ nullable: true })
  willpower: number;

  @Column({ nullable: true })
  attack: number;

  @Column({ nullable: true })
  defense: number;

  @Column({ nullable: true })
  health: number;
}
