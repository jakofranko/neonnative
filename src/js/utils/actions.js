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
class Actions {
    static scrounge() {
        const foodMessages = weightedGenerator(['You find a scrap of food.', 'You manage to aquire a decent meal.']);
        const creditMessages = weightedGenerator(['You find some change on the ground', 'You find a credit that somebody dropped.', 'You find a credit chit in the gutter. Lucky. It had some money on it.']);
        const mellowMessages = weightedGenerator(['What luck, you found somebody\'s stash. Sucks to be them I guess...', 'Tucked in some trash you find a bit of Mellow. One man\'s trash is another man\'s treasure...', 'A discarded pack of Mellow had a little left in the bottom.']);

        let messages = [];
        let foodAmt = 0;
        let creditAmt = 0;
        let mellowAmt = 0;

        if (Math.random() > 0.5)
            foodAmt++;
        if (Math.random() > 0.7)
            foodAmt++;
        if (Math.random() > 0.9)
            creditAmt++;
        if (Math.random() > 0.99)
            mellowAmt++;

        if (foodAmt > 0)
            messages.push(foodMessages());
        if (creditAmt > 0)
            messages.push(creditMessages());
        if (mellowAmt > 0)
            messages.push(mellowMessages());
        return {
            newPlayer: Map({
                [currencies.food]: foodAmt,
                [currencies.credits]: creditAmt,
                [currencies.mellow]: mellowAmt,
                [currencies.exhaustion]: -0.25
            }),
            messages
        };
    }

    static eat(player) {
        const eatMessages = weightedGenerator([
            'You eat a morsel of food.',
            'You try to quell the rumbling of your stomach.'
        ]);
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
            messages: ['You fall asleep.']
        };
    }

    static sellFood(player) {
        const sellFoodMessages = weightedGenerator([
            'You manage to trade a bit of food for some credits.',
            'You find an eager buyer for a few morsels you don\'t need right now.'
        ]);
        let messages = [sellFoodMessages()];

        // The amount of food sold should never be negative,
        const foodSold = Math.min(
            player.get(currencies.food),
            Math.ceil(Math.random() * 10) * -1
        );
        const creditsEarned = Math.ceil(Math.random() * 5);
        return {
            newPlayer: Map({
                [currencies.food]: foodSold,
                [currencies.credits]: creditsEarned
            }),
            messages
        }
    }

    static takeMellow(player) {
        return {
            newPlayer: add(items.onMellow, buy(items.onMellow, Map(), player)),
            messages: ['You knock back a bit of Mellow.']
        };
    }
}

function doAction(event, player) {
    return Actions[event](player);
}

export default doAction;
