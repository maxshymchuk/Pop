function getId() {
    const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let _id = '';
    for (let i = 0; i < 16; i++) {
        _id += alpha[Math.floor(Math.random() * alpha.length)]
    }
    return _id
}

function isOffScreen(x, y, { offsetX = 0, offsetY = 0 }) {
    return x < -offsetX || x > window.innerWidth + offsetX || y < -offsetY || y > window.innerHeight + offsetY;
}

function throttle(callback) {
    let timestamp = 0;
    return (diff, ...args) => {
        const newTimestamp = Date.now();
        if (newTimestamp - timestamp >= diff) {
            timestamp = newTimestamp;
            return callback(args);
        }
    }
}

export { getId, isOffScreen, throttle };