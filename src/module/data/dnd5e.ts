import { Rarity } from "../const";
import { AffixData } from "./types";

export const affixes: AffixData = {
    weapon: {
        prefixes: {
            [Rarity.COMMON]: [
                { label: 'Sharp(C)', effect: "is sharper", rarity: Rarity.COMMON },
                { label: 'Balanced(C)', effect: "is balanced", rarity: Rarity.COMMON },
            ],
            [Rarity.UNCOMMON]: [
                { label: 'Engraved(U)', effect: "is engraved", rarity: Rarity.UNCOMMON },
                { label: 'Brutal(U)', effect: "is brutal", rarity: Rarity.UNCOMMON },
            ],
            [Rarity.RARE]: [
                { label: 'Sacred(R)', effect: "is sacred", rarity: Rarity.RARE },
            ],
            [Rarity.VERY_RARE]: [
                { label: 'Astral(VR)', effect: "is astral", rarity: Rarity.VERY_RARE },
                { label: 'Feyborne(VR)', effect: "is from the Feywild", rarity: Rarity.VERY_RARE },
            ],
            [Rarity.LEGENDARY]: [
                { label: 'Godly(L)', effect: "is godly", rarity: Rarity.LEGENDARY }
            ],
        },
        suffixes: {
            [Rarity.COMMON]: [
                { label: 'Fury(C)', effect: "is furious", rarity: Rarity.COMMON },
                { label: 'Lordship(C)', effect: "is of lordship", rarity: Rarity.COMMON },
            ],
            [Rarity.UNCOMMON]: [
                { label: 'the Ancients(U)', effect: "is from the ancients", rarity: Rarity.UNCOMMON },
                { label: 'Flame and Fire(U)', effect: "is of flame and fire", rarity: Rarity.UNCOMMON },
            ],
            [Rarity.RARE]: [
    
                { label: 'the Deadly Hollows(R)', effect: "is from the deadly hollows", rarity: Rarity.RARE },
            ],
            [Rarity.VERY_RARE]: [
                { label: 'Eons(VR)', effect: "is old AF", rarity: Rarity.VERY_RARE }],
            [Rarity.LEGENDARY]: [
    
                { label: 'Godslaying(L)', effect: "is for killing gods", rarity: Rarity.LEGENDARY },
            ],
        }
    },
    // equipment: {
    //     prefixes: [],
    //     suffixes: []
    // },
    // consumable: {
    //     prefixes: [],
    //     suffixes: []
    // },
    // tool: {
    //     prefixes: [],
    //     suffixes: []
    // },
    // loot: {
    //     prefixes: [],
    //     suffixes: []
    // }
}