import { Rarity } from "../const"
import Affix from "../affix"
import { getGame, localize } from "../utils";
import { affixes as dnd5eAffixes } from '../data/dnd5e'

//TODO get modifiers from somewhere
export function affixesForTypeAndRarity(type: string, category: 'prefix' | 'suffix', rarity: Rarity): Affix[] {
    const pluralCategory = `${category}es` as 'prefixes' | 'suffixes';
    const affixes = getAffixesBySystem()
    return affixes[type][pluralCategory][rarity];
}

function getAffixesBySystem() {
    const system = getGame().system.id;
    switch (system) {
        case 'dnd5e': return dnd5eAffixes;
        default: throw new Error(localize('unsupportedSystem'));
    }
}