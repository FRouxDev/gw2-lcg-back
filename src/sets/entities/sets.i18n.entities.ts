import { Languages, SetsI18nFields } from 'src/config/i18n/lang';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CardSet } from './sets.entities';

@Entity()
export class CardSetI18n {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CardSet)
  set: CardSet;

  @Column({
    type: 'enum',
    enum: SetsI18nFields,
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
