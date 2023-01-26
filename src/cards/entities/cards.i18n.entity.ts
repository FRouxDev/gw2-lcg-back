import { CardsI18nFields, Languages } from 'src/config/i18n/lang';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from './cards.entity';

@Entity()
export class CardI18n {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Card, { onDelete: 'CASCADE' })
  card: Card;

  @Column({
    type: 'enum',
    enum: CardsI18nFields,
  })
  field: string;

  @Column({
    type: 'enum',
    enum: Languages,
    default: Languages.FR,
  })
  lang: Languages;

  @Column()
  value: string;
}
