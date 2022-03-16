// With the potential of moving everything into a single wallet,
// it will be necessary to filter things by type, so that items
// don't show up in the condition component etc. These filters will
// be the source of truth for what an "item" actually is.

import currencies from './currencies';
import items from './items';

const statsFilter = [
    currencies.hunger,
    currencies.exhaustion
];

const itemsFilter = [
    currencies.food,
    currencies.credits,
    currencies.mellow,
    items.wellfareShelter.type,
    items.flat.type
];

export { statsFilter, itemsFilter };
