import { weapons } from "../../utils/weapons.js";
import { throttle } from "../../utils/helpers.js";
import { Projectile } from "./Projectile.js";

class Weapon {
    #owner = null;
    #config = null;

    constructor(entity, config = weapons.Pistol) {
        this.#owner = entity;
        this.#config = config;
    }

    #trottledProjectileFunction = throttle(() => {
        return this.#config.pattern.trajectories.map(trajectory => new Projectile(this.#owner, trajectory(this.#owner)))
    });

    fire() {
        return this.#trottledProjectileFunction(1000 / this.#config.firingRate) ?? [];
    }

    get owner() {
        return this.#owner;
    }

    get config() {
        return this.#config;
    }

    set config(config) {
        this.#config = config;
    }
}

export { Weapon };