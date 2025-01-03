class Rule {
    #condition = null;
    #update = null;

    constructor(condition, update) {
        this.#condition = condition;
        this.#update = update;
    }

    apply(...args) {
        if (this.#condition(...args)) {
            this.#update(...args);
            return this;
        }
        return null;
    }
}

export { Rule };