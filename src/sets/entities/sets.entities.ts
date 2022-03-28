import { Entity, Column, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';

export enum SetType {
  PLAYER = 'player',
  ENCOUNTER = 'encounter',
  SPECIAL = 'special',
}

@Entity()
export class CardSet {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: SetType,
    default: SetType.ENCOUNTER,
  })
  type: SetType;
}
