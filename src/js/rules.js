export default function processRules(wallet) {
    let conditions = {};
    if (wallet.get('hunger') < -10)
        conditions.lost = true;
    if (wallet.get('exhaustion') < -10)
        conditions.exhausted = true;

    return conditions;
}
