import { DND5E_ITEM_TYPES, Rarity } from "./const";
import { Modifier } from "./modifier";
import { RandomItem } from "./randomItem";
import { getGame, getRandomFromArray, localize } from "./utils";

export interface RandomItemOptions { type?: string };

export default class Randomizer {
    randomItem = async (options?: RandomItemOptions): Promise<RandomItem> => {
        let { type } = options ?? { type: undefined };
        if (!type) type = randomizeTypeForSystem();
        else if(!validType(type)) throw new Error(localize('invalidType'));

        const { prefixes, suffixes } = this.modifiersForType(type);
        const item = { name: `Placeholder${type.capitalize()}`, type: type };
        const baseName = item.name;
        let prefix;
        let suffix;

        const itemRoll = Math.random();
        const rarity = rollItemRarity();
        // (0.4 , 0.6) creates both a prefix and a suffix
        if (itemRoll < 0.6) {
            const validPrefixes = prefixes.filter(p => p.rarity <= rarity);
            prefix = getRandomFromArray(validPrefixes);

            // TODO apply prefix
            console.log(`Prefix effect: ${prefix.effect}`);
            item.name = `${prefix.label} ${item.name}`;
        }
        if (itemRoll > 0.4) {
            const validSuffixes = suffixes.filter(p => p.rarity <= rarity);
            suffix = getRandomFromArray(validSuffixes);

            // TODO apply suffix
            console.log(`Suffix effect: ${suffix.effect}`);
            item.name = `${item.name} of ${suffix.label}`;
        }

        return { item, baseName, rarity, prefix, suffix };
    }

    modifiersForType = (type: string): {
        prefixes: Modifier[], // ABC {item}
        suffixes: Modifier[], // {item} of XYZ
    } => {
        //TODO get modifiers from somewhere

        return {
            prefixes: [
                { label: 'Sharp(C)', effect: "is sharper", rarity: Rarity.COMMON },
                { label: 'Balanced(C)', effect: "is balanced", rarity: Rarity.COMMON },
                { label: 'Engraved(U)', effect: "is engraved", rarity: Rarity.UNCOMMON },
                { label: 'Brutal(U)', effect: "is brutal", rarity: Rarity.UNCOMMON },
                { label: 'Sacred(R)', effect: "is sacred", rarity: Rarity.RARE },
                { label: 'Astral(M)', effect: "is astral", rarity: Rarity.MYTHIC },
            ],
            suffixes: [
                { label: 'Fury(C)', effect: "is furious", rarity: Rarity.COMMON },
                { label: 'Lordship(C)', effect: "is of lordship", rarity: Rarity.COMMON },
                { label: 'the Ancients(U)', effect: "is from the ancients", rarity: Rarity.UNCOMMON },
                { label: 'Flame and Fire(U)', effect: "is of flame and fire", rarity: Rarity.UNCOMMON },
                { label: 'the Deadly Hollows(R)', effect: "is from the deadly hollows", rarity: Rarity.RARE },
                { label: 'Eons(M)', effect: "is old AF", rarity: Rarity.MYTHIC },
            ],
        }
    }
}

const rollItemRarity = () => {
    const roll = new Roll('1d100').evaluate({ async: false })
    roll.toMessage({ flavor: 'Rarity roll' });
    const result = roll.total;

    const rarity = result <= 50
        ? Rarity.COMMON
        : result <= 85
            ? Rarity.UNCOMMON
            : Rarity.RARE;

    if (rarity == Rarity.RARE) {
        // roll for mythic
        const mythicRoll = new Roll('1d8').evaluate({ async: false })
        mythicRoll.toMessage({ flavor: 'Mythic roll' });
        if (mythicRoll.total === 8) return Rarity.MYTHIC;
    }
    return rarity;
}

function validType(type: string) {
    switch(getGame().system.id) {
        case 'dnd5e': 
            return DND5E_ITEM_TYPES.includes(type);
        default:
            throw new Error(localize('unsupportedSystem'));
    }
}

function randomizeTypeForSystem(): string {
    switch(getGame().system.id) {
        case 'dnd5e': 
            return getRandomFromArray(DND5E_ITEM_TYPES);
        default:
            throw new Error(localize('unsupportedSystem'));
    }
}

