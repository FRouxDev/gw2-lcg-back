export const keysToExclude = ['Type', 'Setup'];

const toBoolean = (val: string) => Boolean(val);
const toNumber = (val: string) => Number(val);

export const keywordsSpliter = (keywords: string): string[] => {
  return keywords.split('. ').map((keyword) => keyword.replace('.', ''));
};

export const iconReplacer = (text: string): string => {
  return text
    .replace('$', '[threat]')
    .replace('Ò', '[willpower]')
    .replace('Û', '[attack]')
    .replace('Ú', '[defense]')
    .replace('Ï', '[tactics]')
    .replace('Ì', '[leadership]')
    .replace('Î', '[lore]')
    .replace('Ê', '[spirit]');
};

export const XMLToCardMapping = {
  'Card Number': { key: 'cardNumber', process: toNumber },
  Unique: { key: 'unique', process: toBoolean },
  Sphere: { key: 'sphere', process: (v: string) => v },
  Cost: { key: 'cost', process: toNumber },
  'Engagement Cost': { key: 'engagement', process: toNumber },
  Threat: { key: 'threat', process: toNumber },
  Willpower: { key: 'willpower', process: toNumber },
  Attack: { key: 'attack', process: toNumber },
  Defense: { key: 'defense', process: toNumber },
  Health: { key: 'health', process: toNumber },
  'Quest Points': { key: 'questPoints', process: toNumber },
  Traits: { key: 'traits', process: keywordsSpliter },
  Keywords: { key: 'keywords', process: keywordsSpliter },
  Text: { key: 'text', process: iconReplacer },
  Shadow: { key: 'shadow', process: iconReplacer },
  VictoryPoints: { key: 'victoryPoints', process: toNumber },
  Quantity: { key: 'quantity', process: toNumber },
};
