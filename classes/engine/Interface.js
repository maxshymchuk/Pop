import { Config } from "../Config.js";

class Interface {
    #killed = Config.interface.querySelector('.killed');
    #hp = Config.interface.querySelector('.hp');

    killed(killed) {
        if (!this.#killed) return;
        this.#killed.innerText = `Killed: ${killed}`;
    }

    hp(hp) {
        if (!this.#hp) return;
        this.#hp.innerText = `${hp} / 100`;
    }

    hide() {
        Config.interface.classList.add('hidden');
    }

    show() {
        Config.interface.classList.remove('hidden');
    }
}

export { Interface };