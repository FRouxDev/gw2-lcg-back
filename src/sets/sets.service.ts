import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardSet } from './entities/sets.entities';
import { CardSetDto } from './sets.dto';
@Injectable()
export class SetsService {
  constructor(
    @InjectRepository(CardSet)
    private setsRepository: Repository<CardSet>,
  ) {}

  async createSet({ name, type, uuid }: CardSetDto): Promise<CardSet> {
    const newSet: CardSet = await this.setsRepository.save({ name, type, uuid });
    return newSet;
  }

  async deleteSet(uuid: string): Promise<void> {
    await this.setsRepository.delete(uuid);
  }

  async getSet(uuid: string): Promise<CardSet> {
    const cardSet: CardSet = await this.setsRepository.findOne({ where: { uuid }, relations: ['cards'] });
    return cardSet;
  }

  async getAllSets(): Promise<Array<CardSet>> {
    const cardSets: Array<CardSet> = await this.setsRepository.find({ relations: ['cards'] });
    return cardSets;
  }
}
