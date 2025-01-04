import { weapons } from "../../../utils/weapons.js";
import { Config } from "../../Config.js";
import { SKEYS } from "../Stats.js";
import { Weapon } from "../../entities/index.js";

const RULES = {
    Initial: 'initial',
    Easy: 'easy',
    Mid: 'mid',
    Hard: 'hard'
}

const rules = {
    [RULES.Easy]: {
        condition: (engine) => {
            return engine.stats.get(SKEYS.EnemiesKilled) >= 1;
        },
        change: (engine) => {
            Config.enemiesMaxCount = 20;
            Config.enemiesDelay = 500;
            engine.playersPool.entities.forEach(entity => {
                entity.weapon = new Weapon(entity, weapons.MachineGun);
            });
        }
    },
    [RULES.Mid]: {
        condition: (engine) => {
            return engine.stats.get(SKEYS.EnemiesKilled) >= 5;
        },
        change: (engine) => {
            Config.enemiesMaxCount = 30;
            Config.enemiesDelay = 100;
            engine.playersPool.entities.forEach(entity => {
                entity.weapon = new Weapon(entity, weapons.UltraGun);
            });
        }
    },
    [RULES.Hard]: {
        condition: (engine) => {
            return engine.stats.get(SKEYS.EnemiesKilled) >= 10;
        },
        change: (engine) => {
            Config.enemiesMaxCount = 50;
            Config.enemiesDelay = 50;
            engine.playersPool.entities.forEach(entity => {
                entity.weapon = new Weapon(entity, weapons.MegaGun);
            });
        }
    }
}

class RulesController {
    #engine = null;
    #appliedRules = new Set();

    constructor(engine, initial) {
        this.#engine = engine;
        this.#appliedRules = new Set(typeof initial === 'array' ? initial : [initial]);
    }

    reset() {
        this.#appliedRules = {};
    }

    check() {
        const rulesToApply = new Set();
        for (let rule in rules) {
            if (rules[rule].condition(this.#engine) && !this.#appliedRules.has(rule)) {
                rulesToApply.add(rule);
            }
        }
        rulesToApply.forEach(rule => {
            rules[rule].change(this.#engine);
            this.#appliedRules.add(rule);
        });
    }
}

export { RulesController, RULES };