import { Config } from "../Config.js";

class Menu {
    #single = Config.menu.querySelector('.single');
    #multi = Config.menu.querySelector('.multi');

    constructor({ onSingleClick, onMultiClick }) {
        if (this.#single) this.#single.addEventListener('click', onSingleClick);
        if (this.#multi) this.#multi.addEventListener('click', onMultiClick);
    }

    hide() {
        Config.menu.classList.add('hidden');
    }

    show() {
        Config.menu.classList.remove('hidden');
    }
}

export { Menu };