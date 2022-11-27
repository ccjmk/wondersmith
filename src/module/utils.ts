import { MODULE_NAMESPACE } from './const';

export const getGame = (): Game => {
  if (!(game instanceof Game)) {
    throw new Error('game is not initialized yet!');
  }
  return game;
};

export const localize = (key: string, data?: Record<string, unknown>) => {
  const { i18n } = getGame();
  const fullKey = `${MODULE_NAMESPACE.toUpperCase()}.${key}`;
  if (data) return i18n.format(fullKey, data);
  return i18n.localize(fullKey);
};

export function getRandomFromArray<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
