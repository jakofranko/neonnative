import { Map } from 'immutable';
import currencies from './currencies';

class Events {
    static scrounge() {
        let messages = [];
        let foodAmt = 0;
        let creditAmt = 0;
        if (Math.random() > 0.5) {
            foodAmt++;
            messages.push('You find a scrap of food.');
        }
        if (Math.random() > 0.7) {
            foodAmt++;
            messages.push('You manage to aquire a decent meal.');
        }
        if (Math.random() > 0.9) {
            creditAmt++;
            messages.push('You find a credit that somebody dropped.');
        }

        return {
            inventory: Map({
                [currencies.food]: foodAmt,
                [currencies.credits]: creditAmt
            }),
            stats: Map({ [currencies.exhaustion]: -0.25 }),
            messages
        };
    }

    static eat(stats, inventory) {
        let messages = [];
        if (Math.random() > 0.6)
            messages.push('You eat a morsel of food.');
        else if (Math.random() > 0.9)
            messages.push('You try to quell the rumbling of yoru stomach.');
        return {
            inventory: Map({ [currencies.food]: -1 }),
            stats: Map({ [currencies.hunger]: stats.get(currencies.hunger) < 10 ? 1 : 0 }),
            messages
        };
    }

    static sleep() {
        return {
            condition: { sleeping: true },
            messages: ['You fall asleep.']
        };
    }
}

function doEvent(event, stats, inventory) {
    return Events[event](stats, inventory);
}

export default doEvent;
