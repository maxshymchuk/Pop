import { fanTrajectory, linearTrajectory, sinTrajectory } from "./trajectories.js";

const weapons = {
    Pistol: {
        name: 'Pistol',
        firingRate: 2,
        pattern: {
            trajectories: [
                (entity) => linearTrajectory(entity.x, entity.y, 0, -10)
            ]
        }
    },
    MachineGun: {
        name: 'Machine Gun',
        firingRate: 5,
        pattern: {
            trajectories: [
                (entity) => linearTrajectory(entity.x, entity.y, 0, -10)
            ]
        }
    },
    UltraGun: {
        name: 'Ultra Gun',
        firingRate: 10,
        pattern: {
            trajectories: [
                (entity) => sinTrajectory(entity.x, entity.y, 0.2, 80, 40, 1),
                (entity) => sinTrajectory(entity.x, entity.y, 0.2, 80, 40, -1),
            ]
        }
    },
    MegaGun: {
        name: 'Mega Gun',
        firingRate: 15,
        pattern: {
            trajectories: [
                (entity) => fanTrajectory(entity.x, entity.y, 0.5, -Math.PI / 6),
                (entity) => fanTrajectory(entity.x, entity.y, 0.5, 0),
                (entity) => fanTrajectory(entity.x, entity.y, 0.5, Math.PI / 6),
            ]
        }
    }
}

export { weapons };