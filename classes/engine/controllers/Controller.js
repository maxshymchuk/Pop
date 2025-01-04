class Controller {
    #engine = null;
    #node = null

    constructor(engine, node) {
        if (!engine) throw new Error('Engine must be provided');
        this.#engine = engine;
        if (!node) throw new Error('Node must be provided');
        this.#node = node;
    }

    hide() {
        this.#node.classList.add('hidden');
    }

    show() {
        this.#node.classList.remove('hidden');
    }

    get engine() {
        return this.#engine;
    }
}

export { Controller };