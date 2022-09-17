import { _isValidResultRange } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/tableResultData";
import { DND5E_ITEM_TYPES, Rarity } from "./const";
import { Modifier } from "./modifier";
import { RandomItem } from "./randomItem";
import { getGame, getRandomFromArray, localize } from "./utils";

export interface RandomItemOptions { type?: string };

export default class Randomizer {
    randomItem = async (options?: RandomItemOptions): Promise<RandomItem> => {

        let { type } = options ?? { type: undefined };
        if (!type) type = randomizeTypeForSystem();
        else if (!validType(type)) throw new Error(localize('invalidType'));

        const { prefixes, suffixes } = this.modifiersForType(type);
        const item = { name: type.capitalize() + "", type: type };
        const baseName = item.name;
        let prefix;
        let suffix;

        const itemRoll = Math.random();
        const rarity = rollItemRarity();
        try {
            // (0.4 , 0.6) creates both a prefix and a suffix
            if (itemRoll < 0.6) {
                const validPrefixes = shuffle(prefixes.filter(p => p.rarity <= rarity)).sort((a, b) => b.rarity - a.rarity);
                if (validPrefixes.length) {
                    prefix = getRandomFromArray(validPrefixes);

                    // TODO apply prefix
                    console.log(`Prefix effect: ${prefix.effect}`);
                    item.name = `${prefix.label} ${item.name}`;
                }
            }
            if (itemRoll > 0.4) {
                const validSuffixes = shuffle(suffixes.filter(p => p.rarity <= rarity)).sort((a, b) => b.rarity - a.rarity);
                if (validSuffixes.length) {
                    suffix = getRandomFromArray(validSuffixes);

                    // TODO apply suffix
                    console.log(`Suffix effect: ${suffix.effect}`);
                    item.name = `${item.name} of ${suffix.label}`;
                }
            }
        } catch (error) {
            console.error(error);
            console.log(`roll: ${itemRoll}`)
            console.log(`rarity: ${rarity}`);
            console.log(`prefix: ${prefix}`);
            console.log(`suffix: ${suffix}`);
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
                { label: 'Astral(VR)', effect: "is astral", rarity: Rarity.VERY_RARE },
                { label: 'Godly(L)', effect: "is godly", rarity: Rarity.VERY_RARE },
            ],
            suffixes: [
                { label: 'Fury(C)', effect: "is furious", rarity: Rarity.COMMON },
                { label: 'Lordship(C)', effect: "is of lordship", rarity: Rarity.COMMON },
                { label: 'the Ancients(U)', effect: "is from the ancients", rarity: Rarity.UNCOMMON },
                { label: 'Flame and Fire(U)', effect: "is of flame and fire", rarity: Rarity.UNCOMMON },
                { label: 'the Deadly Hollows(R)', effect: "is from the deadly hollows", rarity: Rarity.RARE },
                { label: 'Eons(VR)', effect: "is old AF", rarity: Rarity.VERY_RARE },
                { label: 'Godslaying(L)', effect: "is for killing gods", rarity: Rarity.LEGENDARY },
            ],
        }
    }
}

const rollItemRarity = () => {
    const roll = new Roll('1d100').evaluate({ async: false })
    const result = roll.total;

    return result < 40
        ? Rarity.COMMON
        : result < 70
            ? Rarity.UNCOMMON
            : result < 85
                ? Rarity.RARE
                : result < 95
                    ? Rarity.VERY_RARE
                    : Rarity.LEGENDARY;
}

function shuffle<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function validType(type: string) {
    switch (getGame().system.id) {
        case 'dnd5e':
            return DND5E_ITEM_TYPES.includes(type);
        default:
            throw new Error(localize('unsupportedSystem'));
    }
}

function randomizeTypeForSystem(): string {
    switch (getGame().system.id) {
        case 'dnd5e':
            return getRandomFromArray(DND5E_ITEM_TYPES);
        default:
            throw new Error(localize('unsupportedSystem'));
    }
}

