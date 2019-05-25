import { Map } from 'immutable';
import currencies from './currencies';

const flat = {
    type: 'Flat',
    description: 'A roof over your head, 4 walls, a bed, and not much else. In addition to the security deposite, you will have to pay rent here.',
    cost: function() {
        return Map({ [currencies.credits]: -10 });
    },
    effect: function() {
        return Map({ [currencies.credits]: -0.001 });
    },
    condition: function(state) {
        return state.get(currencies.credits)  >= 10;
    },
    qty: 1
};

export default { flat };
