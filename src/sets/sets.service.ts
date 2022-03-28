import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardSet } from './entities/sets.entities';
import { CardSetDto } from './sets.dto';
import { CardSetInterface } from './sets.interface';

@Injectable()
export class SetsService {
  constructor(
    @InjectRepository(CardSet)
    private setsRepository: Repository<CardSet>,
  ) {}

  async createSet({ name, type }: CardSetDto): Promise<CardSet> {
    const newSet: CardSet = await this.setsRepository.save({ name, type });
    return newSet;
  }

  async deleteSet(uuid: string): Promise<void> {
    await this.setsRepository.delete({ uuid });
  }

  async getSet(uuid: string): Promise<CardSet> {
    const cardSet: CardSet = await this.setsRepository.findOne({
      where: { uuid },
    });
    return cardSet;
  }

  async getAllSets(): Promise<Array<CardSet>> {
    const cardSets: Array<CardSet> = await this.setsRepository.find();
    return cardSets;
  }
}
