import { Config } from './classes/Config.js';
import { Engine } from './classes/engine/Engine.js';
import { 
    collisionsHandler, 
    createEnemyHandler, 
    enemiesHandler, 
    interfaceHandler, 
    playersHandler, 
    projectilesHandler, 
} from './handlers.js';

Config.playerCount = 1;
Config.enemiesMaxCount = 10;
Config.enemiesDelay = 1500;

const engine = new Engine(Config.app);

function init() {
    engine.tick(() => {
        createEnemyHandler(Config.enemiesDelay, engine)
        playersHandler(engine);
        enemiesHandler(engine);
        projectilesHandler(engine);
        collisionsHandler(engine);
        interfaceHandler(engine);
    })
}

window.addEventListener('load', init);