import items from './items';
import currencies from './currencies';

const { foodEater, sleeper } = items;

const startingAttributes = {
    [foodEater.type]: 1,
    [sleeper.type]: 1,
    [currencies.credits]: 5,
    [currencies.mellow]: 1,
    exhaustMax: 10,
    exhaustMin: -10,
    hungerMax: 10,
    hungerMin: -10,
}

export default startingAttributes;
