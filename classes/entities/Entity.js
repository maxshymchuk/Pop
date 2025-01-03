import { getId } from '../../utils/helpers.js';
import { Position } from '../Position.js';
import { Config } from '../Config.js';

class Entity extends Position {
    #id = getId();
    #element = null;
    #width = null;
    #height = null;

    #hp = Infinity;

    constructor(initial) {
        const { x, y, node, hp } = initial ?? {}

        super(x, y);

        const clonedNode = node.cloneNode();
        clonedNode.dataset.id = this.#id;
        this.#element = clonedNode;

        const { width, height } = node.getBoundingClientRect();
        this.#width = width;
        this.#height = height;

        if (hp) this.#hp = hp;
    }

    get id() {
        return this.#id;
    }

    get element() {
        return this.#element;
    }

    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }

    get hp() {
        return this.#hp;
    }

    create() {
        this.update();
        Config.app.append(this.#element);
    }

    update() {
        this.#element.style.left = `${this.x}px`;
        this.#element.style.top = `${this.y}px`;
    }

    delete() {
        this.#element.remove();
    }
}

export { Entity };
