// SPDX-FileCopyrightText: 2022 Johannes Loher
//
// SPDX-License-Identifier: MIT

// Import TypeScript modules
import { registerSettings } from './settings';
import { preloadTemplates } from './preloadTemplates';
import { MODULE_NAMESPACE } from './const';
import Wondersmith from './app';
import { getGame } from './utils';
import Randomizer from './randomizer';
import ModuleApi from './moduleApi';

let randomizer: Randomizer;

// Initialize module
Hooks.once('init', async () => {
  console.info('Wondersmith | Initializing module');
  registerSettings();
  await preloadTemplates();
  randomizer = new Randomizer();
});

// Setup module
Hooks.once('setup', async () => {
  const module: Game.ModuleData<foundry.packages.ModuleData> & ModuleApi = getGame().modules.get(MODULE_NAMESPACE)!;
  module.api = { randomItem: randomizer.randomItem };
});

// When ready
Hooks.once('ready', async () => {
  const app = new Wondersmith(randomizer);
  app.render(true);
});
