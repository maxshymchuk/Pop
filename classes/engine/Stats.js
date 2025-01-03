const SKEYS = {
    EnemiesKilled: 'enemiesKilled'
}

class Stats {
    #data = {
        [SKEYS.EnemiesKilled]: 0
    };

    constructor(initial) {
        if (initial) this.#data = initial;
    }

    set(key, valueOrCallback) {
        if (typeof valueOrCallback === 'function') {
            this.#data[key] = valueOrCallback(this.#data[key])
        } else {
            this.#data[key] = valueOrCallback;
        }
    }

    get(key) {
        return this.#data[key];
    }

    get data() {
        return this.#data;
    }
}

export { SKEYS, Stats };