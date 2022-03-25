import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class OctgnConfig {
  @PrimaryColumn()
  key: string;

  @Column()
  value: string;
}
