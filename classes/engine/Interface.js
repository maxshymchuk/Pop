const interfaceDom = document.querySelector('.interface');

class Interface {
    #killed = interfaceDom.querySelector('.killed');
    #hp = interfaceDom.querySelector('.hp');

    killed(killed) {
        this.#killed.innerText = `Killed: ${killed}`;
    }

    hp(hp) {
        this.#hp.innerText = `${hp} / 100`;
    }
}

export { Interface };