import { CardSet } from 'src/sets/entities/sets.entities';
import { Entity, Column, PrimaryGeneratedColumn, TableInheritance, ManyToOne, OneToOne, ChildEntity } from 'typeorm';
import { Sphere } from 'src/shared/types/sphere.type';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Card {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @ManyToOne(() => CardSet, (cardSet) => cardSet.cards)
  set: CardSet;

  @Column()
  traits: string[];

  @Column({ nullable: true })
  cardNumber: number;
}

@ChildEntity()
export class Hero extends Card {
  @Column()
  unique: boolean;

  @Column({
    type: 'enum',
    enum: Sphere,
  })
  sphere: Sphere;

  @Column()
  keywords: string[];

  @Column()
  threat: number;

  @Column()
  text: string;

  @Column()
  willpower: number;

  @Column()
  attack: number;

  @Column()
  defense: number;

  @Column()
  health: number;
}

@ChildEntity()
export class Ally extends Card {
  @Column()
  unique: boolean;

  @Column({
    type: 'enum',
    enum: Sphere,
  })
  sphere: Sphere;

  @Column()
  keywords: string[];

  @Column()
  cost: number;

  @Column()
  text: string;

  @Column()
  willpower: number;

  @Column()
  attack: number;

  @Column()
  defense: number;

  @Column()
  health: number;
}

@ChildEntity()
export class Event extends Card {
  @Column({
    type: 'enum',
    enum: Sphere,
  })
  sphere: Sphere;

  @Column()
  keywords: string[];

  @Column()
  cost: number;

  @Column()
  text: string;
}

@ChildEntity()
export class Attachment extends Card {
  @Column()
  unique: boolean;

  @Column({
    type: 'enum',
    enum: Sphere,
  })
  sphere: Sphere;

  @Column()
  keywords: string[];

  @Column()
  cost: number;

  @Column()
  text: string;
}

@ChildEntity()
export class Enemy extends Card {
  @Column()
  unique: boolean;

  @Column()
  keywords: string[];

  @Column()
  engagement: number;

  @Column()
  text: string;

  @Column()
  shadow: string;

  @Column()
  threat: number;

  @Column()
  attack: number;

  @Column()
  defense: number;

  @Column()
  health: number;

  @Column({ nullable: true })
  victoryPoints: number;
}

@ChildEntity()
export class Location extends Card {
  @Column()
  unique: boolean;

  @Column()
  keywords: string[];

  @Column()
  questPoints: number;

  @Column()
  text: string;

  @Column()
  shadow: string;

  @Column()
  threat: number;

  @Column({ nullable: true })
  victoryPoints: number;
}

@ChildEntity()
export class Treachery extends Card {
  @Column()
  keywords: string[];

  @Column()
  text: string;

  @Column()
  shadow: string;
}

@ChildEntity()
export class Quest extends Card {
  @Column()
  text: string;

  @OneToOne(() => Quest, (quest) => quest.alternate)
  alternate: Quest;

  @Column({ nullable: true })
  questPoints: number;

  @Column({ nullable: true })
  victoryPoints: number;
}
