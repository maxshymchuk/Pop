import { Config } from "./classes/Config.js";
import { SKEYS } from "./classes/engine/Stats.js";
import { Enemy } from "./classes/entities/index.js";
import { isOffScreen, throttle } from "./utils/helpers.js";
import { rules } from "./utils/rules.js";

function playersHandler(engine) {
    engine.playersPool.entities.forEach((player, i) => {
        let vx = 0;
        let vy = 0;
        const player_pressed = i === 0 ? engine.controls.player1_pressed : engine.controls.player2_pressed;
        if (player_pressed.fire) { engine.projectilesPool.add(...player.fire()) }
        if (player_pressed.up) { vy = -player.speed; }
        if (player_pressed.right) { vx = player.speed; }
        if (player_pressed.down) { vy = player.speed; }
        if (player_pressed.left) { vx = -player.speed; }
        player.x += vx;
        player.y += vy;
        player.update();
    });
}

function enemiesHandler(engine) {
    engine.enemiesPool.entities.forEach(enemy => {
        enemy.y += enemy.speed;
        if (enemy.y > window.innerHeight + 100) {
            engine.enemiesPool.remove(enemy);
            return;
        }
        enemy.update();
    });
}

function projectilesHandler(engine) {
    engine.projectilesPool.entities.forEach(projectile => {
        const { x, y } = projectile.trajectory();
        projectile.x = x;
        projectile.y = y;
        if (isOffScreen(projectile.x, projectile.y, { offsetX: 300 })) {
            engine.projectilesPool.remove(projectile);
            return;
        }
        projectile.update();
    });
}

const rulesHandler = (() => {
    let appliedRule = null;
    return (engine) => {
        rules.forEach(rule => {
            if (appliedRule === rule) return;
            const newRule = rule.apply(engine);
            if (newRule) appliedRule = newRule;
        });
    }
})();

function interfaceHandler(engine) {
    engine.interface.killed(engine.stats.get(SKEYS.EnemiesKilled));
    engine.interface.hp(engine.playersPool.entities[0].hp);
}

function collisionsHandler(engine) {
    engine.enemiesPool.entities.forEach(enemy => {
        engine.projectilesPool.entities.forEach(projectile => {
            if (
                projectile.x + projectile.width / 2 > enemy.x - enemy.width / 2 && 
                projectile.x - projectile.width / 2 < enemy.x + enemy.width / 2 &&
                projectile.y + projectile.height / 2 > enemy.y - enemy.height / 2 && 
                projectile.y - projectile.height / 2 < enemy.y + enemy.height / 2
            ) {
                engine.enemiesPool.remove(enemy);
                engine.projectilesPool.remove(projectile);
                engine.stats.set(SKEYS.EnemiesKilled, value => ++value);
                return;
            }
        })
    })
}

const createEnemyHandler = throttle(([engine]) => {
    if (engine.enemiesPool.size < Config.enemiesMaxCount) {
        engine.enemiesPool.add(new Enemy({
            x: 100 + Math.floor(Math.random() * (window.innerWidth - 200)),
            y: -100,
            speed: Math.floor(Math.random() * 5) + 2
        }));
    };
})

export { 
    playersHandler,
    enemiesHandler, 
    projectilesHandler, 
    collisionsHandler, 
    rulesHandler, 
    interfaceHandler, 
    createEnemyHandler 
};