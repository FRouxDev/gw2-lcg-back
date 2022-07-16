import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardDto } from './cards.dto';
import { Card, Hero, Ally, Event, Attachment, Enemy, Location, Treachery, Quest } from './entities/cards.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
    @InjectRepository(Hero)
    private heroesRepository: Repository<Hero>,
    @InjectRepository(Ally)
    private alliesRepository: Repository<Ally>,
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(Attachment)
    private attachmentsRepository: Repository<Attachment>,
    @InjectRepository(Enemy)
    private enemiesRepository: Repository<Enemy>,
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
    @InjectRepository(Treachery)
    private treacheriesRepository: Repository<Treachery>,
    @InjectRepository(Quest)
    private questsRepository: Repository<Quest>,
  ) {}

  getRepository(entity: string): Repository<Card> {
    const repositoryMap = {
      Hero: this.heroesRepository,
      Ally: this.alliesRepository,
      Event: this.eventsRepository,
      Attachment: this.attachmentsRepository,
      Enemy: this.enemiesRepository,
      Location: this.locationsRepository,
      Treachery: this.treacheriesRepository,
      Quest: this.questsRepository,
    };

    return repositoryMap[entity];
  }

  async createCard(card: CardDto): Promise<Card> {
    const cardsRepository = this.getRepository(card.type);
    const newCard = cardsRepository.save(card);
    return newCard;
  }

  async deleteCard(uuid: string): Promise<void> {
    await this.cardsRepository.delete(uuid);
  }

  async getAllCards(): Promise<Array<Card>> {
    const cards: Array<Card> = await this.cardsRepository.find({ relations: ['set'] });
    return cards;
  }

  async getAllCardsFromType(type: string): Promise<Array<Card>> {
    const cardsRepository = this.getRepository(type);
    const cards: Array<Card> = await cardsRepository.find({ relations: ['set'] });
    return cards;
  }
}
