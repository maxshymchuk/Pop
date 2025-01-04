import { Pool } from "../Pool.js";
import { Config } from "../Config.js";
import { Interface } from "./Interface.js";
import { Player } from '../entities/index.js';
import { Stats } from "./Stats.js";
import { Controls } from "./Controls.js";
import { Menu } from "./Menu.js";

const MODE = {
    Single: 'single',
    Multi: 'multi'
}

class Engine {
    #running = false;
    #mode = null;
    #root = null;
    
    #menu = null;
    #interface = new Interface();
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
            this.#menu.hide();
            this.#interface.show();
        } else {
            this.#hide();
            this.#menu.show();
            this.#interface.hide();
        }
    }

    constructor(root) {
        if (!root) throw new Error('Root element must be provided');
        this.#root = root;

        this.#menu = new Menu({ 
            onSingleClick: () => {
                this.#mode = MODE.Single;
                this.#running = true;
                this.#playersPool.clear().add(new Player({
                    x: window.innerWidth / 2, 
                    y: window.innerHeight - 200, 
                    speed: 10, 
                    firingRate: 300,
                    hp: 100
                }));
                this.#check();
            },
            onMultiClick: () => {
                this.#mode = MODE.Multi;
                this.#running = true;
                this.#playersPool.clear().add(
                    new Player({
                        x: window.innerWidth / 3, 
                        y: window.innerHeight - 200, 
                        speed: 10, 
                        firingRate: 300,
                        hp: 100
                    }),
                    new Player({
                        x: window.innerWidth / 3 * 2, 
                        y: window.innerHeight - 200, 
                        speed: 10, 
                        firingRate: 300,
                        hp: 100
                    }),
                );
                this.#check();
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
        if (this.#running) callback();
        window.requestAnimationFrame(() => this.tick(callback));
    }
}

export { Engine };