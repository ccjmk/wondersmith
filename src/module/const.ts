export const MODULE_NAMESPACE = 'wondersmith';

export const enum Rarity {
    COMMON=1,
    UNCOMMON=2,
    RARE=3,
    VERY_RARE=5,
    LEGENDARY=8,
}

export const DND5E_ITEM_TYPES = ['weapon', 'equipment', 'consumable', 'tool', 'loot'] as const;
export type Dnd5eItemType = typeof DND5E_ITEM_TYPES[number]