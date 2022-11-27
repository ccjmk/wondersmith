import { RandomItemOptions } from './randomizer';
import { RandomItem } from './randomItem';

export default interface ModuleApi {
  api?: {
    randomItem: (options?: RandomItemOptions) => Promise<RandomItem>;
  };
}
