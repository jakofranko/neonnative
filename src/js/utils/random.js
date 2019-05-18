// This will return a random element from an array, but
// will be more likely to return the first elements than the last elements.
function weightedRandom(list, exponent = 2) {
    const weightedIndex = Math.floor(Math.pow(Math.random(), exponent) * list.length);
    return list[weightedIndex];
}

function weightedGenerator(possibilities) {
    return function() {
        return weightedRandom(possibilities);
    }
}

export { weightedRandom, weightedGenerator };
