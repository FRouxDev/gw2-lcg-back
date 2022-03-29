import { Card } from 'src/cards/entities/cards.entity';
import { Entity, Column, PrimaryGeneratedColumn, TableInheritance, OneToMany } from 'typeorm';
import { SetType } from 'src/shared/types/setType.type';

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

  @OneToMany(() => Card, (card) => card.set)
  cards: Card[];
}
