const SKEYS = {
    EnemiesKilled: 'enemiesKilled'
}

const DEFAULT_STATS = {
    [SKEYS.EnemiesKilled]: 0
}

class Stats {
    #data = { ...DEFAULT_STATS };

    constructor(initial) {
        if (initial) this.#data = initial;
    }

    reset() {
        this.#data = { ...DEFAULT_STATS };
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