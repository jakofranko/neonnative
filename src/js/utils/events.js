import { Map } from 'immutable';

import currencies from './currencies';
import items from './items';

const currencyNames = Object.values(currencies);

const events = [
    {
        name: 'Sleep Robbers',
        chance: 0.05,
        condition: (state) => {
            const hasShelter = state.player.get(items.wellfareShelter.type);
            const hasFlat = state.player.get(items.flat.type);
            const isSleeping = state.player.get(items.sleeping.type);
            const exhaustion = state.player.get(currencies.exhaustion);
            let chance = 0;

            if (exhaustion < 0)
                chance += 0.3;
            if (exhaustion < state.player.get('exhaustMax') / 2)
                chance += 0.1;
            if (hasShelter)
                chance -= 0.2
            if (hasFlat)
                chance -= 0.7

            if (isSleeping) {
                return Math.random() < chance;
            } else {
                return false;
            }
        },
        effect: function(state) {
            const messages = ["While you are sleeping, robbers take some of your possessions."];

            // If the player has more than 1 of a kind of currency, it can be stolen.
            debugger;
            const ledgers = currencyNames.map(currency => {
                const playerCurrrency = state.player.get(currency);
                if (playerCurrrency && playerCurrrency > 1) {
                    return Map({
                        [currency]: Math.floor((playerCurrrency / 2) * -1)
                    });
                }

                return Map({});
            })
            const lost = false;
            return { messages, ledgers, lost };
        }
    }
];

function processEvents(state) {
    const { ledgers, eventMessages, eventLost } = events.reduce((results, event) => {
        if (Math.random() < event.chance && event.condition(state)) {
            let { ledgers, messages, lost } = event.effect(state);
            return {
                eventMessages: results.eventMessages.concat(messages),
                ledgers: results.ledgers.concat(ledgers),
                eventLost: results.eventLost || lost
            };
        } else {
            return results;
        }
    }, {
        ledgers: [],
        eventMessages: [],
        eventLost: false
    });

    return { ledgers, eventMessages, eventLost };
}

export default processEvents;
