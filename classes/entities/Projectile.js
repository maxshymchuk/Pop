import { Entity } from './Entity.js';
import { Config } from '../Config.js';

class Projectile extends Entity {
    #owner = null;
    #trajectory = null;

    constructor(entity, trajectory) {
        super({ x: entity.x, y: entity.y, node: Config.projectile });

        this.#owner = entity;
        this.#trajectory = trajectory;
    }

    get owner() {
        return this.#owner;
    }

    get trajectory() {
        return this.#trajectory;
    }
}

export { Projectile };