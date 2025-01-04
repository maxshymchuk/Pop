import { weapons } from "../../../utils/weapons.js";
import { Config } from "../../Config.js";
import { SKEYS } from "../Stats.js";
import { Weapon } from "../../entities/index.js";
import { Controller } from "./Controller.js";

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

const DEFAULT_RULES = new Set([RULES.Initial]);

class RulesController extends Controller {
    #applied = DEFAULT_RULES;

    constructor(engine, initial) {
        super(engine);
        this.#applied = new Set(typeof initial === 'array' ? initial : [initial]);
    }

    reset() {
        this.#applied = DEFAULT_RULES;
    }

    check() {
        const rulesToApply = new Set();
        for (let rule in rules) {
            if (rules[rule].condition(this.engine) && !this.#applied.has(rule)) {
                rulesToApply.add(rule);
            }
        }
        rulesToApply.forEach(rule => {
            rules[rule].change(this.engine);
            this.#applied.add(rule);
        });
    }
}

export { RulesController, RULES };