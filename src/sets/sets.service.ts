import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID } from 'typeorm';
import { MongoFindOneOptions } from 'typeorm/find-options/mongodb/MongoFindOneOptions';
import { CardSet } from './entities/sets.entities';
import { CardSetDto } from './sets.dto';
@Injectable()
export class SetsService {
  constructor(
    @InjectRepository(CardSet)
    private setsRepository: MongoRepository<CardSet>,
  ) {}

  async createSet({ name, type }: CardSetDto): Promise<CardSet> {
    const newSet: CardSet = await this.setsRepository.save({ name, type });
    return newSet;
  }

  async deleteSet(id: ObjectID): Promise<void> {
    await this.setsRepository.delete(id);
  }

  async getSet(id: ObjectID): Promise<CardSet> {
    const cardSet: CardSet = await this.setsRepository.findOne(id as MongoFindOneOptions<CardSet>);
    return cardSet;
  }

  async getAllSets(): Promise<Array<CardSet>> {
    const cardSets: Array<CardSet> = await this.setsRepository.find();
    return cardSets;
  }
}
