import { Map } from 'immutable';
import currencies from './currencies';

const wellfareShelter = {
    type: 'Wellfare Shelter',
    description: "It'll get you out of the rain even if the sheets aren't always clean, and you'll be less of a target for the roving gangs besides. There is a nominal rent fee.",
    cost: function() {
        return Map({ [currencies.credits]: -5 });
    },
    effect: function() {
        return Map({ [currencies.credits]: -0.0005 });
    },
    condition: function(state) {
        return state.get(currencies.credits) >= 5;
    },
    qty: 1
};

const flat = {
    type: 'Flat',
    description: 'A roof over your head, 4 walls, a bed, and not much else. In addition to the security deposite, you will have to pay rent here.',
    cost: function() {
        return Map({
            [currencies.credits]: -100,
            [wellfareShelter.type]: -1
        });
    },
    effect: function() {
        return Map({ [currencies.credits]: -0.001 });
    },
    condition: function(state) {
        return state.get(currencies.credits) >= 50 && state.get(wellfareShelter.type);
    },
    qty: 1
};

export default { wellfareShelter, flat };
