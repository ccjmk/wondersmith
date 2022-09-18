import { Rarity } from './const';

export default interface Affix {
  label: string; // part added to the item name
  effect: string;
  rarity: Rarity;
}
