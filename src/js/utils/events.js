import { Map } from 'immutable';
import { add, buy } from 'merchant.js';
import currencies from './currencies';
import items from './items';
import { weightedGenerator } from './random';

// Each event should return an object with two keys: newPlayer, and messages.
// The newPlayer is an object that will represent a change to the main player ledger.
// It should not (usually) return a changed player ledger, ie, it should only take blank Maps
// for the add and buy functions.
// Messages is an array of strings that will go into the dialog component.
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
            newPlayer: Map({
                [currencies.food]: foodAmt,
                [currencies.credits]: creditAmt,
                [currencies.exhaustion]: -0.25
            }),
            messages
        };
    }

    static eat(player) {
        const eatMessages = weightedGenerator(['You eat a morsel of food.', 'You try to quell the rumbling of your stomach.']);
        let messages = [eatMessages()];

        return {
            newPlayer: Map({
                [currencies.food]: -1 ,
                [currencies.hunger]: player.get(currencies.hunger) < 10 ? 1 : 0
            }),
            messages
        };
    }

    static sleep(player) {
        return {
            newPlayer: add(items.sleeping, buy(items.sleeping, Map(), player)),
            condition: { sleeping: true },
            messages: ['You fall asleep.']
        };
    }
}

function doEvent(event, player) {
    return Events[event](player);
}

export default doEvent;
