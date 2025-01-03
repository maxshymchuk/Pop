function linearTrajectory(_x, _y, shiftX = 0, shiftY = 0) {
    let ix = _x;
    let iy = _y;
    return () => {
        const newPos = { 
            x: ix,
            y: iy
        }
        ix += shiftX;
        iy += shiftY;
        return newPos;
    }
}

function sinTrajectory(_x, _y, step = 0.2, ax = 80, ay = 40, k = 1) {
    let i = 0;
    return () => {
        const newPos = { 
            x: _x + -ax * Math.sin(i) * k, 
            y: _y + -ay * i 
        }
        i += step;
        return newPos;
    }
}

function fanTrajectory(_x, _y, step = 0.2, angle = 0) {
    let i = 0;
    return () => {
        const newPos = { 
            x: _x + 10 * Math.tan(angle) * i,
            y: _y + -10 * Math.cos(angle) * i
        }
        i += step;
        return newPos;
    }
}

export { linearTrajectory, sinTrajectory, fanTrajectory };