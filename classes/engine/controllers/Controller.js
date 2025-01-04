class Controller {
    #engine = null;
    #node = null

    constructor(engine, node) {
        if (!engine) throw new Error('Engine must be provided');
        this.#engine = engine;
        this.#node = node;
    }

    hide() {
        if (!this.#node) return;
        this.#node.classList.add('hidden');
    }

    show() {
        if (!this.#node) return;
        this.#node.classList.remove('hidden');
    }

    get engine() {
        return this.#engine;
    }
}

export { Controller };