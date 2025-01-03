class Pool {
    #entities = {};

    constructor(initial = {}) {
        this.#entities = initial;
    }

    get size() {
        return Object.keys(this.#entities).length;
    }

    get entities() {
        return Object.values(this.#entities);
    }

    clear() {
        this.#entities = {};
        return this;
    }

    add(...entities) {
        entities.forEach(entity => {
            if (!entity) return;
            this.#entities[entity.id] = entity;
            entity.create();
        });
        return this;
    }

    remove(...entities) {
        entities.forEach(entity => {
            if (!entity) return;
            delete this.#entities[entity.id];
            entity.delete();
        });
        return this;
    }
}

export { Pool };