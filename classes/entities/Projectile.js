import { Entity } from './Entity.js';
import { Config } from '../Config.js';

class Projectile extends Entity {
    #trajectory = null;

    constructor(entity, trajectory) {
        super({ x: entity.x, y: entity.y, node: Config.projectile });

        this.#trajectory = trajectory(entity);
    }

    get trajectory() {
        return this.#trajectory;
    }
}

export { Projectile };