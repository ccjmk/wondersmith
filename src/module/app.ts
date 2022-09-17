import { MODULE_NAMESPACE, Rarity } from "./const";
import Randomizer from "./randomizer";
import { localize } from "./utils";

export default class Wondersmith extends Application {
    readonly randomizer: Randomizer;

    constructor(randomizer: Randomizer) {
        super();
        this.randomizer = randomizer;
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
    private rarityEl!: HTMLSpanElement;

    activateListeners(html: JQuery): void {
        const el = this.element.get()[0];
        el.querySelector('#spinner')?.addEventListener('click', () => this.spin());
        this.baseNameEl = el.querySelector('.spinners .base')!;
        this.prefixEl = el.querySelector('.spinners .prefix')!;
        this.suffixEl = el.querySelector('.spinners .suffix')!;
        this.spinnersEl = el.querySelector('.spinners')!;
        this.rarityEl = el.querySelector('#rarity')!;
    }

    async spin() {
        const item = await this.randomizer.randomItem();
        this.baseNameEl.textContent = item.baseName;
        this.prefixEl.textContent = item.prefix?.label ?? '';
        this.suffixEl.textContent = item.suffix?.label ? `of ${item.suffix?.label}` : '';
        this.spinnersEl.style.color = getRarityColor(item.rarity);
        this.rarityEl.textContent = localize(`Rarity.${item.rarity}`)
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

