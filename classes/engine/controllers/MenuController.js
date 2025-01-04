import { Config } from "../../Config.js";
import { MODE } from "../Engine.js";
import { Controller } from "./Controller.js";

function buildBindings() {
    const capitalize = (str) => str[0].toUpperCase().concat(str.slice(1));
    const title = (str) => `<div class="menu__title--sub">${capitalize(str)}</div>`;
    const cell = (str) => `<div class="menu__grid-cell">${capitalize(str)}</div>`;
    const grid = (...cells) => `<div class="menu__grid">${cells.join('')}</div>`;
    return function loop(bindings) {
        if (typeof bindings === 'string') return cell(bindings);
        let content = '';
        for (let binding in bindings) {
            if (typeof bindings[binding] === 'object') {
                content = content.concat(title(binding), loop(bindings[binding]));
            } else {
                content = content.concat(grid(cell(binding), cell(bindings[binding])))
            }
        }
        return content;
    }
}

class MenuController extends Controller {
    #single = Config.menu.querySelector('.single');
    #multi = Config.menu.querySelector('.multi');
    #bindings = Config.menu.querySelector('.bindings');

    constructor(engine, node, { onStart }) {
        super(engine, node);
        this.#bindings.innerHTML = buildBindings()(Config.bindings);
        if (this.#single) this.#single.addEventListener('click', () => onStart(MODE.Single));
        if (this.#multi) this.#multi.addEventListener('click', () => onStart(MODE.Multi));
    }

    check() {
        if (this.engine.running) {
            this.hide();
        } else {
            this.show();
        }
    }
}

export { MenuController };