import { add, buy } from 'merchant.js';

import currencies from './currencies';
import items from './items';
import { weightedGenerator } from './random';

const wakeUpMessages = weightedGenerator(['You open your eyes feeling rested.', 'You awaken, body and mind refreshed.', 'You regain consiousness, the dark world little better than your dark dreams.']);
const exhaustedMessages = weightedGenerator(['You drop to the floor from exhaustion.', 'Unable to do another single thing, you collapse.']);
const starvationDeathMessages = weightedGenerator(['You die from starvation.']);

const MELLOW_DURATION = 1000;
let mellowTimer = null;

export default function processRules(state) {
    const { player } = state;
    const sleeping = player.get(items.sleeping.type);
    let updatedPlayer = player;
    let messages = [];
    let lost = false;

    if (sleeping && player.get(currencies.exhaustion) >= player.get('exhaustMax')) {
        updatedPlayer = add(items.sleeper, buy(items.sleeper, player, player));
        messages.push(wakeUpMessages());
    } else if (player.get(currencies.exhaustion) <= player.get('exhaustMin')) {
        updatedPlayer = add(items.sleeping, buy(items.sleeping, player, player));
        messages.push(exhaustedMessages());
    }

    if (player.get(currencies.hunger) < player.get('hungerMin')) {
        lost = true;
        messages.push(starvationDeathMessages());
    }

    if (player.get(items.onMellow.type) && player.get(items.onMellow.type) > 0) {
        if (mellowTimer === null) {
            mellowTimer = MELLOW_DURATION;
        }

        if (mellowTimer > 0) {
            mellowTimer--;
        } else {
            mellowTimer = null;
            updatedPlayer = add(items.onMellow, updatedPlayer, -1);
            messages.push("You feel your pulse return to normal as the Mellow wears off.");
        }
    }

    return {
        updatedPlayer,
        messages,
        lost
     };
}
