import { Entity } from './Entity.js';
import { Config } from '../Config.js';
import { Weapon } from './Weapon.js';

const PLAYER = {
    First: 'first',
    Second: 'second'
}

class Player extends Entity {
    #speed = 0;
    #weapon = null;

    constructor(initial) {
        const { player = PLAYER.First, speed, weapon, ...rest } = initial ?? {};

        super({ node: player === PLAYER.First ? Config.player1 : Config.player2, ...rest });

        this.#weapon = new Weapon(this, weapon);

        if (speed) this.#speed = speed;
    }
    
    fire() {
        return this.#weapon.fire();
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

export { Player, PLAYER };