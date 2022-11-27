import { Rarity } from './const';
import Affix from './affix';

export interface RandomItem {
  item: { name: string };
  base: string;
  rarity: Rarity;
  prefix?: Affix;
  suffix?: Affix;
}
