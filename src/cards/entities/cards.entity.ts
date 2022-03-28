import { Entity, Column, PrimaryColumn, TableInheritance } from 'typeorm';

@Entity()
export class Card {
  @PrimaryColumn()
  key: string;

  @Column()
  value: string;
}
