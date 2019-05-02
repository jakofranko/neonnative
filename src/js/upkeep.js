import c from './currencies';
export default {
    default: {
        [c.hunger]: -0.01,
        [c.exhaustion]: -0.01
    },
    sleeping: {
        [c.hunger]: -0.01,
        [c.exhaustion]: 0.1
    }
};
