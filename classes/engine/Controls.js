import { Config } from "../Config.js";

class Controls {
    #pressed = new Set();
    #player1_pressed = {
        up: false,
        right: false,
        down: false,
        left: false,
        fire: false
    };
    #player2_pressed = {
        up: false,
        right: false,
        down: false,
        left: false,
        fire: false
    };

    constructor() {
        document.onkeydown = e => this.#keyDown(e);
        document.onkeyup = e => this.#keyUp(e);
    }

    #keyDown(e) {
        this.#pressed.add(e.code);
        for (let i in Config.bindings.player1) {
            if (e.code === Config.bindings.player1[i]) this.#player1_pressed[i] = true;
        }
        for (let i in Config.bindings.player2) {
            if (e.code === Config.bindings.player2[i]) this.#player2_pressed[i] = true;
        }
    }

    #keyUp(e) {
        this.#pressed.delete(e.code);
        for (let i in Config.bindings.player1) {
            if (e.code === Config.bindings.player1[i]) this.#player1_pressed[i] = false;
        }
        for (let i in Config.bindings.player2) {
            if (e.code === Config.bindings.player2[i]) this.#player2_pressed[i] = false;
        }
    }

    get pressed() {
        return this.#pressed;
    }

    get player1_pressed() {
        return this.#player1_pressed;
    }

    get player2_pressed() {
        return this.#player2_pressed;
    }
}



export { Controls }; 