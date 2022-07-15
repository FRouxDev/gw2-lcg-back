import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OctgnConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  value: string;
}
