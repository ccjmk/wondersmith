import { Rarity } from "./const";
import { Modifier } from "./modifier";

export interface RandomItem {
    item: { name: string; };
    baseName: string;
    rarity: Rarity;
    prefix?: Modifier;
    suffix?: Modifier;
}
