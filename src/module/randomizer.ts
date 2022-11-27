import { _isValidResultRange } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/tableResultData";
import { DND5E_ITEM_TYPES, Rarity } from "./const";
import Affix from "./affix";
import { RandomItem } from "./randomItem";
import { affixesForTypeAndRarity } from "./services/affixService";
import { getGame, getRandomFromArray, localize } from "./utils";

export interface RandomItemOptions { type?: string };

export default class Randomizer {

    systemTypes = (): readonly string[] => {
        switch (getGame().system.id) {
            case 'dnd5e':
                return DND5E_ITEM_TYPES;
            default:
                throw new Error(localize('unsupportedSystem'));
        }
    }

    randomItem = async (options: unknown={}): Promise<RandomItem> => {
        if(!isRandomItemOptions(options)) throw new Error(localize('InvalidOptions'));
        
        let { type } = options ?? { type: undefined };
        if (!type) type = randomizeTypeForSystem();
        else if (!validType(type)) throw new Error(localize('invalidType'));

        console.info(`Wondersmith | generating random ${type}`);

        const item = { name: type.capitalize() as string, type };
        const base = item.name;
        let prefix;
        let suffix;

        const { hasPrefix, hasSuffix } = rollAffixes();
        try {
            if (hasPrefix) {
                prefix = getRandomAffix(type, "prefix");

                // TODO apply prefix
                console.log(`Prefix effect: ${prefix.effect} (${prefix.rarity})`);
                item.name = `${prefix.label} ${item.name}`;
            }
            if (hasSuffix) {
                suffix = getRandomAffix(type, "suffix");

                // TODO apply suffix
                console.log(`Suffix effect: ${suffix.effect} (${suffix.rarity})`);
                item.name = `${item.name} of ${suffix.label}`;
            }
        } catch (error) {
            console.error(error);
            console.log(`roll: ${hasPrefix} ${hasSuffix}`)
            console.log(`prefix: ${prefix}`);
            console.log(`suffix: ${suffix}`);
        }

        const rarity = calculateFinalRarity(prefix, suffix);
        return { item, base, rarity, prefix, suffix };
    }
}

function getRandomAffix(type: string, category: 'prefix' | 'suffix'): Affix {
    const rarity = rollItemRarity();
    const affixes = affixesForTypeAndRarity(type, category, rarity);

    // TODO: Move this checking into the loading process
    if (affixes.length === 0) {
        throw new Error(localize('NoPrefixForTypeAndSystem'));
    }

    return getRandomFromArray(affixes);
}

const rollItemRarity = () => {
    const { total } = new Roll('1d100').evaluate({ async: false });
    switch (true) {
        case (total < 40):
            return Rarity.COMMON;
        case (total < 70):
            return Rarity.UNCOMMON;
        case (total < 85):
            return Rarity.RARE;
        case (total < 95):
            return Rarity.VERY_RARE;
        default:
            return Rarity.LEGENDARY;
    }
}

function rollAffixes(): { hasPrefix: boolean, hasSuffix: boolean } {
    const roll = Math.random();
    // TODO take values from module setting
    return {
        hasPrefix: roll < 0.6,
        hasSuffix: roll > 0.4
    }
}

type ItemType = 'ValidItemType';

function validType(type: string): type is ItemType {
    switch (getGame().system.id) {
        case 'dnd5e':
            return DND5E_ITEM_TYPES.includes(type as any);
        default:
            return false;
    }
}

function isRandomItemOptions(options: unknown): options is RandomItemOptions {
    return (isObject(options))
        && (options.type === undefined
            || (typeof options.type === 'string' && validType(options.type))
        );
}

function isObject(options: unknown): options is { [key: string]: unknown } {
    return (typeof options === 'object');
}

function randomizeTypeForSystem(): string {
    switch (getGame().system.id) {
        case 'dnd5e':
            return getRandomFromArray(DND5E_ITEM_TYPES);
        default:
            throw new Error(localize('unsupportedSystem'));
    }
}

function calculateFinalRarity(prefix: Affix | undefined, suffix: Affix | undefined) {
    const itemRarity = (prefix?.rarity ?? 0) + (suffix?.rarity ?? 0);
    console.log("final rarity: "+itemRarity);
    switch(true) {
        case itemRarity < Rarity.UNCOMMON: return Rarity.COMMON;
        case itemRarity < Rarity.RARE: return Rarity.UNCOMMON;
        case itemRarity < Rarity.VERY_RARE: return Rarity.RARE;
        case itemRarity < Rarity.LEGENDARY: return Rarity.VERY_RARE;
        default: return Rarity.LEGENDARY;
    }
}

