import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardSet } from 'src/sets/entities/sets.entities';
import { SetType } from 'src/shared/types/setType.type';
import { Repository } from 'typeorm';
import { CardDto } from './cards.dto';
import { Card, Hero, Ally, Event, Attachment, Enemy, Location, Treachery, Quest } from './entities/cards.entity';
import { keysToExclude, XMLToCardMapping } from './utils/XMLToCard.helpers';
import { XMLCardDto } from './xmlCards.dto';

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

  async updateCard(uuid: string, card: Partial<CardDto>): Promise<void> {
    await this.cardsRepository.update({ uuid }, { cardImage: card.cardImage });
  }

  async deleteCard(uuid: string): Promise<void> {
    await this.cardsRepository.delete(uuid);
  }

  async getAllCards(): Promise<Array<Card>> {
    const cards: Array<Card> = await this.cardsRepository.find({ order: { name: 'ASC' }, relations: ['set'] });
    return cards;
  }

  async getAllCardsFromType(type: string): Promise<Array<Card>> {
    const cardsRepository = this.getRepository(type);
    const cards: Array<Card> = await cardsRepository.find({ relations: ['set'] });
    return cards;
  }

  async getAllPlayerCards(): Promise<Array<Card>> {
    const cards: Array<Card> = await this.cardsRepository.find({
      relations: ['set'],
      where: {
        set: {
          type: SetType.PLAYER,
        },
      },
    });
    return cards;
  }

  cardBuilder(xmlCard: XMLCardDto, cardSet: CardSet) {
    const type: string = xmlCard.property.find((prop) => prop._name === 'Type')._value;

    const newCard: Partial<CardDto> = {
      uuid: xmlCard._id,
      name: xmlCard._name,
      set: cardSet,
      cardImage: `./uploads/img/${cardSet.uuid}/${xmlCard._id}.jpg`,
      type,
    };

    const usefulProperties = xmlCard.property.filter((prop) => !keysToExclude.includes(prop._name));

    console.log(usefulProperties);
    console.log(cardSet);

    for (const property of usefulProperties) {
      const propKey = XMLToCardMapping[property._name].key;
      const propValue = XMLToCardMapping[property._name].process(property._value);
      newCard[propKey] = propValue;
    }

    return newCard as CardDto;
  }
}
