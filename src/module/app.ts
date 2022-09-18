import { MODULE_NAMESPACE, Rarity } from "./const";
import Randomizer from "./randomizer";
import { localize } from "./utils";

export default class Wondersmith extends Application {
    private readonly randomizer: Randomizer;
    private readonly types;

    constructor(randomizer: Randomizer) {
        super();
        this.randomizer = randomizer;
        this.types = randomizer.systemTypes();
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

    private baseNameEl!: HTMLElement;
    private prefixEl!: HTMLElement;
    private suffixEl!: HTMLElement;
    private spinnersEl!: HTMLElement;
    private readonly typeButtons: Map<string, HTMLElement> = new Map();

    getData() {
        return { types: this.types };
    }

    activateListeners(html: JQuery): void {
        super.activateListeners(html);
        const el = this.element.get()[0];
        this.baseNameEl = el.querySelector('[data-wondersmith-reel="base"]')!;
        this.prefixEl = el.querySelector('[data-wondersmith-reel="prefix"]')!;
        this.suffixEl = el.querySelector('[data-wondersmith-reel="suffix"]')!;
        this.spinnersEl = el.querySelector('.wdsm-reels')!;

        //random all button
        el.querySelector('[data-wondersmith_spinner="any"]')?.addEventListener('click', () => this.spin());

        //type-specific buttons
        this.types.forEach(t => el.querySelector(`[data-wondersmith_spinner="${t}"]`)?.addEventListener('click', () => this.spin(t)));
    }

    async spin(type?: string) {
        const item = await this.randomizer.randomItem(type?{type}:{});
        this.baseNameEl.textContent = item.baseName;
        this.prefixEl.textContent = item.prefix?.label ?? '';
        this.suffixEl.textContent = item.suffix?.label ? `of ${item.suffix?.label}` : '';
        this.spinnersEl.style.color = getRarityColor(item.rarity);
        this.spinnersEl.title = localize(`Rarity.${item.rarity}`);
    }
}

function getRarityColor(rarity: Rarity): string {
    switch (rarity) {
        case Rarity.COMMON: return '#2c2c2c';
        case Rarity.UNCOMMON: return '#ffffff'
        case Rarity.RARE: return '#dbb900';
        case Rarity.VERY_RARE: return '#0e28ed';
        case Rarity.LEGENDARY: return '#6800db';
    }
}

