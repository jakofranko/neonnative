import { Map } from 'immutable';
import currencies from './currencies';
import { weightedGenerator } from './random';

class Events {
    static scrounge() {
        const foodMessages = weightedGenerator(['You find a scrap of food.', 'You manage to aquire a decent meal.']);
        const creditMessages = weightedGenerator(['You find some change on the ground', 'You find a credit that somebody dropped.', 'You find a credit chit in the gutter. Lucky. It had some money on it.'])

        let messages = [];
        let foodAmt = 0;
        let creditAmt = 0;

        if (Math.random() > 0.5)
            foodAmt++;
        if (Math.random() > 0.7)
            foodAmt++;
        if (Math.random() > 0.9)
            creditAmt++;

        if (foodAmt > 0)
            messages.push(foodMessages());
        if (creditAmt > 0)
            messages.push(creditMessages());
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
        const eatMessages = weightedGenerator(['You eat a morsel of food.', 'You try to quell the rumbling of your stomach.']);
        let messages = [eatMessages()];

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
