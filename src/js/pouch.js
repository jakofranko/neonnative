import { Map } from 'immutable';
import currencies from "./currencies";

export const MagicSword = {
    type: "MagicSword",
    cost: () => {
        return Map({
            [currencies.gold]: -5
        });
    },
    effect: (state) => {
        return Map({
            [currencies.power]: state.currentPowerLevel
        });
    }
};
