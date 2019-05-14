import { Map } from 'immutable';
import currencies from './currencies';

class Events {
    static scrounge() {
        let foodAmt = 0;
        if (Math.random() > 0.5)
            foodAmt++;
        if (Math.random() > 0.7)
            foodAmt++;

        return {
            inventory: Map({ [currencies.food]: foodAmt }),
            stats: Map({ [currencies.exhaustion]: -0.25 })
        };
    }

    static eat() {
        return {
            inventory: Map({ [currencies.food]: -1 }),
            stats: Map({ [currencies.hunger]: 1 })
        };
    }

    static sleep() {
        return {
            condition: { sleeping: true }
        };
    }
}

function doEvent(event) {
    return Events[event]();
}

export default doEvent;
