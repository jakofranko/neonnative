import { Map } from 'immutable';

import currencies from './currencies';
import items from './items';

const events = [
    {
        name: 'Test Event',
        chance: 0.05,
        condition: (state) => Math.random() > 0.5,
        effect: function(state) {
            const messages = ['This is a test event message'];
            const ledgers = [Map({ [currencies.credits]: 1 })];
            const lost = false;
            return { messages, ledgers, lost };
        }
    },
    {
        name: 'Only with Shelter',
        chance: 0.01,
        condition: (state) => state.player.get(items.wellfareShelter.type),
        effect: function() {
            return {
                ledgers: [],
                messages: ['You have a shelter!'],
                lost: false
            }
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
