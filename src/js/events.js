import { Map } from 'immutable';
import currencies from './currencies';

function scroungeEvent() {
    let foodAmt = 0;
    if (Math.random() > 0.5)
        foodAmt++;
    if (Math.random() > 0.7)
        foodAmt++;

    return Map({
        [currencies.food]: foodAmt
    });
}

function eatEvent() {
    return {
        foodTransaction: Map({ [currencies.food]: -1 }),
        hungerTransaction: Map({ [currencies.hunger]: 1 })
    }
}

export default { scroungeEvent, eatEvent };
