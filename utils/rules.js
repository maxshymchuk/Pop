import { Config } from "../classes/Config.js";
import { SKEYS } from "../classes/engine/Stats.js";
import { Weapon } from "../classes/entities/index.js";
import { Rule } from "../classes/Rule.js";
import { weapons } from "./weapons.js";

const rules = [
    new Rule(
        (engine) => {
            return engine.stats.get(SKEYS.EnemiesKilled) === 1;
        },
        (engine) => {
            Config.enemiesMaxCount = 20;
            Config.enemiesDelay = 500;
            engine.playersPool.entities.forEach(entity => {
                entity.weapon = new Weapon(entity, weapons.MachineGun);
            });
        }
    ),
    new Rule(
        (engine) => {
            return engine.stats.get(SKEYS.EnemiesKilled) === 5;
        },
        (engine) => {
            Config.enemiesMaxCount = 30;
            Config.enemiesDelay = 100;
            engine.playersPool.entities.forEach(entity => {
                entity.weapon = new Weapon(entity, weapons.UltraGun);
            });
        }
    ),
    new Rule(
        (engine) => {
            return engine.stats.get(SKEYS.EnemiesKilled) === 10;
        },
        (engine) => {
            Config.enemiesMaxCount = 50;
            Config.enemiesDelay = 50;
            engine.playersPool.entities.forEach(entity => {
                entity.weapon = new Weapon(entity, weapons.MegaGun);
            });
        }
    )
]

export { rules };