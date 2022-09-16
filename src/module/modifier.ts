import { Rarity } from './const';

export interface Modifier {
  label: string; // part added to the item name
  effect: string;
  rarity: Rarity;
}
