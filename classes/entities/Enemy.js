import { Entity } from './Entity.js';
import { Config } from '../Config.js';

class Enemy extends Entity {
    #speed = 0; // TODO: remove

    constructor(initial) {
        const { speed, ...rest } = initial ?? {};

        super({ node: Config.enemy, ...rest });

        if (speed) this.#speed = speed;
    }

    get speed() {
        return this.#speed;
    }

    set speed(speed) {
        this.#speed = speed;
    }
}

export { Enemy };