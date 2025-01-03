import { weapons } from "../../utils/weapons.js";
import { throttle } from "../../utils/helpers.js";
import { Projectile } from "./Projectile.js";

class Weapon {
    #entity = null;
    #config = null;

    constructor(entity, config = weapons.Pistol) {
        this.#entity = entity;
        this.#config = config;
    }

    #trottledProjectileFunction = throttle(() => {
        let projectiles = [];
        const trajectories = this.#config.pattern.trajectories;
        for (let i = 0; i < trajectories.length; i++) {
            projectiles.push(new Projectile(this.#entity, trajectories[i]));
        }
        return projectiles;
    });

    fire() {
        return this.#trottledProjectileFunction(1000 / this.#config.firingRate) ?? [];
    }

    get config() {
        return this.#config;
    }

    set config(config) {
        this.#config = config;
    }
}

export { Weapon };