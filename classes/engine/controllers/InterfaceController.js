import { Config } from "../../Config.js";
import { Controller } from "./Controller.js";

class InterfaceController extends Controller {
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

    check() {
        if (this.engine.running) {
            this.show();
        } else {
            this.hide();
        }
    }
}

export { InterfaceController };