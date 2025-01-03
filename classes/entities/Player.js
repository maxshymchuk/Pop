import { Entity } from './Entity.js';
import { Config } from '../Config.js';
import { Weapon } from './Weapon.js';

class Player extends Entity {
    #speed = 0;
    #weapon = null;

    constructor(initial) {
        const { speed, weapon, ...rest } = initial ?? {};

        super({ node: Config.player, ...rest });

        this.#weapon = new Weapon(this);

        if (speed) this.#speed = speed;
    }
    
    fire() {
        return this.#weapon.fire();
        // this.#weapons.forEach(weapon => weapon.fire());
    }

    get speed() {
        return this.#speed;
    }

    get weapon() {
        return this.#weapon;
    }

    set speed(speed) {
        this.#speed = speed;
    }

    set weapon(weapon) {
        this.#weapon = weapon;
    }
}

export { Player };