class Config {
    static #app = document.querySelector('.app');
    static #menu = document.querySelector('.menu');
    static #interface = document.querySelector('.interface');
    static #player1 = document.querySelector('.player.player1');
    static #player2 = document.querySelector('.player.player2');
    static #enemy = document.querySelector('.enemy');
    static #projectile = document.querySelector('.projectile');

    static #bindings = {
        pause: 'Escape',
        player1: {
            up: 'KeyW',
            right: 'KeyD',
            down: 'KeyS',
            left: 'KeyA',
            fire: 'Space',
        },
        player2: {
            up: 'ArrowUp',
            right: 'ArrowRight',
            down: 'ArrowDown',
            left: 'ArrowLeft',
            fire: 'Period',
        }
    }

    static #playersCount = 1;
    static #enemiesMaxCount = 0;
    static #enemiesDelay = Infinity;

    static get bindings() {
        return this.#bindings;
    }

    static get app() {
        return this.#app;
    }

    static get menu() {
        return this.#menu;
    }

    static get interface() {
        return this.#interface;
    }

    static get player1() {
        return this.#player1;
    }

    static get player2() {
        return this.#player2;
    }

    static get enemy() {
        return this.#enemy;
    }

    static get projectile() {
        return this.#projectile;
    }

    static get playerCount() {
        return this.#playersCount;
    }

    static get enemiesMaxCount() {
        return this.#enemiesMaxCount;
    }

    static get enemiesDelay() {
        return this.#enemiesDelay;
    }
    
    static set enemiesMaxCount(count) {
        if (count >= 0) this.#enemiesMaxCount = count;
    }

    static set enemiesDelay(delay) {
        if (delay >= 0) this.#enemiesDelay = delay;
    }

    static set playerCount(count) {
        if (count > 2) throw new Error('Max player count is 2');
        return this.#playersCount;
    }
}

export { Config };