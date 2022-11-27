// SPDX-FileCopyrightText: 2022 Johannes Loher
//
// SPDX-License-Identifier: MIT

export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = [
    // Add paths to "modules/wondersmith/templates"
    'modules/wondersmith/templates/main.hbs',
  ];

  return loadTemplates(templatePaths);
}
