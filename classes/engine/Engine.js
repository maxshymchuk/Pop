import { Pool } from "../Pool.js";
import { Config } from "../Config.js";
import { Player } from '../entities/index.js';
import { Stats } from "./Stats.js";
import { Controls } from "./Controls.js";
import { MenuController } from "./controllers/MenuController.js";
import { PLAYER } from "../entities/Player.js";
import { InterfaceController } from "./controllers/InterfaceController.js";
import { RULES, RulesController } from "./controllers/RulesController.js";

const MODE = {
    Single: 'single',
    Multi: 'multi'
}

class Engine {
    #running = false;
    #mode = null;
    #root = null;
    
    #menu = null;
    #interface = new InterfaceController(this, Config.interface);
    #rulesController = new RulesController(this, RULES.Initial);

    #stats = new Stats();
    #controls = new Controls();

    #playersPool = new Pool();
    #enemiesPool = new Pool();
    #projectilesPool = new Pool();

    #show() {
        this.#root.classList.remove('hidden');
    }

    #hide() {
        this.#root.classList.add('hidden');
    }

    #check() {
        if (this.#running) {
            this.#show();
        } else {
            this.#hide();
        }
    }

    constructor(root) {
        if (!root) throw new Error('Root element must be provided');
        this.#root = root;

        this.#menu = new MenuController(this, Config.menu, { 
            onStart: (mode) => {
                this.#mode = mode;
                this.#running = true;
                this.#stats.reset();
                this.#enemiesPool.clear();
                this.#projectilesPool.clear();
                this.#check();
                if (mode === MODE.Single) {
                    this.#playersPool.clear().add(new Player({
                        player: PLAYER.First,
                        x: window.innerWidth / 2, 
                        y: window.innerHeight - 200, 
                        speed: 10, 
                        firingRate: 300,
                        hp: 100
                    }));
                }
                if (mode === MODE.Multi) {
                    this.#playersPool.clear().add(
                        new Player({
                            player: PLAYER.First,
                            x: window.innerWidth / 3, 
                            y: window.innerHeight - 200, 
                            speed: 10, 
                            firingRate: 300,
                            hp: 100
                        }),
                        new Player({
                            player: PLAYER.Second,
                            x: window.innerWidth / 3 * 2, 
                            y: window.innerHeight - 200, 
                            speed: 10, 
                            firingRate: 300,
                            hp: 100
                        }),
                    );
                }
            }
        })

        this.#menu.show();

        document.addEventListener('keydown', (e) => {
            if (e.code === Config.bindings.pause) {
                this.#running = !this.#running;
            }
        })
    }

    get root() {
        return this.#root;
    }

    get running() {
        return this.#running;
    }

    get mode() {
        return this.#mode;
    }

    get interface() {
        return this.#interface;
    }

    get stats() {
        return this.#stats;
    }

    get rulesController() {
        return this.#rulesController;
    }

    get controls() {
        return this.#controls;
    }

    get playersPool() {
        return this.#playersPool;
    }

    get enemiesPool() {
        return this.#enemiesPool;
    }

    get projectilesPool() {
        return this.#projectilesPool;
    }

    set mode(mode) {
        this.#mode = mode;
    }

    set running(flag) {
        this.#running = flag;
    }

    tick(callback) {
        this.#check();
        this.#menu.check();
        this.#interface.check();
        this.#rulesController.check(this);
        if (this.#running) callback();
        window.requestAnimationFrame(() => this.tick(callback));
    }
}

export { Engine, MODE };