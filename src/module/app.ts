import { MODULE_NAMESPACE, Rarity } from "./const";
import Randomizer from "./randomizer";

const isHTMLButtonElement = (elem: unknown): elem is HTMLButtonElement => elem instanceof HTMLButtonElement;

interface Context {
    types: readonly string[],
    base?: string,
    prefix?: string,
    suffix?: string,
    rarity?: string,
    rarityColor?: ReturnType<typeof getRarityColor>,
}

export default class Wondersmith extends Application {
    private context: Context;

    constructor(private readonly randomizer: Randomizer) {
        super();
        this.context = { types: randomizer.systemTypes() };
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            title: 'Wondersmith',
            template: `modules/${MODULE_NAMESPACE}/templates/main.hbs`,
            width: 400,
            height: 300,
            resizable: false,
        });
    }

    getData() {
        return this.context;
    }

    activateListeners(html: JQuery): void {
        super.activateListeners(html);
        const el = this.element.get(0)!;

        //random all button
        el.querySelector('[data-wondersmith_spinner="any"]')?.addEventListener('click', () => this.handleNewItemClick());

        //type-specific buttons
        el.querySelector('.wdsm-type-buttons')?.addEventListener('click', (e) => {
            if(!isHTMLButtonElement(e.target)) return;

            const type = e.target.dataset['wondersmith_spinner'];
            this.handleNewItemClick(type);
        });
    }

    async handleNewItemClick(type?: string) {
        const item = await this.randomizer.randomItem(type?{type}:{});
        const base = item.base;
        const prefix = item.prefix?.label ?? '';
        const suffix = item.suffix?.label ? `of ${item.suffix?.label}` : '';
        const rarity = `WONDERSMITH.Rarity.${item.rarity}`;
        const rarityColor = getRarityColor(item.rarity);
        
        this.updateContext({base, prefix, suffix, rarity, rarityColor});
    }

    private updateContext(newContext: Partial<Context>) {
        this.context = {...this.context, ...newContext}
        this.render();
    }
}

function getRarityColor(rarity: Rarity) {
    switch (rarity) {
        case Rarity.COMMON: return 'common';
        case Rarity.UNCOMMON: return 'uncommon'
        case Rarity.RARE: return 'rare';
        case Rarity.VERY_RARE: return 'very-rare';
        case Rarity.LEGENDARY: return 'legendary';
    }
}

