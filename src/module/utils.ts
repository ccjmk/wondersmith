import { MODULE_NAMESPACE } from "./const";

export const getGame = (): Game => {
    if (!(game instanceof Game)) {
        throw new Error('game is not initialized yet!');
    }
    return game;
}

export const localize = (key: string, data?: Record<string, unknown>) => {
    const { i18n } = getGame();
    const fullKey = `${MODULE_NAMESPACE.toUpperCase()}.${key}`;
    if(data) return i18n.format(fullKey, data);
    return i18n.localize(fullKey);
}

export function getRandomFromArray<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}