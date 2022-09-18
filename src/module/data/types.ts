import Affix from "../affix"
import { Rarity } from "../const"

export interface AffixData {
    [key: string]: {
        prefixes: {
            [Rarity.COMMON]: Affix[]
            [Rarity.UNCOMMON]: Affix[]
            [Rarity.RARE]: Affix[]
            [Rarity.VERY_RARE]: Affix[]
            [Rarity.LEGENDARY]: Affix[]
        },
        suffixes: {
            [Rarity.COMMON]: Affix[]
            [Rarity.UNCOMMON]: Affix[]
            [Rarity.RARE]: Affix[]
            [Rarity.VERY_RARE]: Affix[]
            [Rarity.LEGENDARY]: Affix[]
        }
    }
}