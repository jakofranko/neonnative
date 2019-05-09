import u from './upkeep';
import currencies from './currencies';
export default function processRules(state) {
    let { stats, chars, condition } = state;
    let { sleeping } = condition;
    let newCondition = {};
    let upkeep = u.default;
    let lost = false;

    if (sleeping && stats.get(currencies.exhaustion) >= chars.get('exhaustMax'))
        newCondition.sleeping = false;
    else if (sleeping)
        upkeep = u.sleeping;
    else if (stats.get(currencies.exhaustion) <= chars.get('exhaustMin'))
        newCondition.sleeping = true;

    if (stats.get(currencies.hunger) < chars.get('hungerMin'))
        lost = true;

    return { condition: Object.assign(condition, newCondition), upkeep, lost };
}
