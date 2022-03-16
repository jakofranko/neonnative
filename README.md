# Neon Native

A cyber-punk incremental browser game.

## Architecture

Neon Native takes advantage of Immutable as well as Merchant.js to handle the management of the `player`. Every `tick` the `player` object is updated based on the items in the player's inventory. Additionally, before the `player` is updated, all the `rules` in place will be processed, and all the `events` will be processed to see if any proc. `rules`, `events`, and `items` all have `effects`, which can generate `messages`.

That's pretty much the gist of it, but let's break these concepts down a bit.

### Items

To quote the Merchant.js docs:

> Items should not be instantiated. They should not store or contain state. They're blueprints, not objects.

As such, all the items defined in `items.js` are blueprints for how the `player` is to be affected every `tick`, depending on how many of the item belongs to the `player`. The `player` object only contains the quantity of each item.

An item has a `type`, which is it's label/name, ad `description`, a `cost` function, which returns a `ledger` object that decrements (or increments) a type of currency (or anything else in the player's inventory), and an optional `effect` function, which will be called every tick and should return a ledger. All of these properties are standard Merchant.js properties and allow them to be used with other Merchant.js functions like `buy`, and `add` etc., but there are two additional properties that items should have so that they can be interacted with via the `Shop` component: `condition`, which is a function that takes the `player` object as an argument and returns a boolean value, and a `qty` property, which determines how many of the item are available to be purchased via the shop. The `condition` property determines whether or not the item is visible in the shop.

Also, "items" are really anything that affects the player on a per-tick basis, and should not be thought of as purely physical objects. For example, `sleeper` is defined as an item, and the effect of the `sleeper` item is that every `tick`, it decrements the `exhaustion` currency. Speaking of which:

### Currency

Currencies can be thought of as special items that are only a tag, with no effects or costs. In other words currencies will only ever have a quantity associated with them in the `player` object, and no other logic.

### Player

In Merchant.js terms, the `player` is actually just a `ledger`. Ledgers are `Map`s of key/value pairs, where each key is a currency or item label, and the value is the quantity. More specifically, the `player` object is the `wallet`. To quote Merchant.js docs again:

> A Wallet is a special ledger that keeps your main state. It's generally computed by adding several ledgers together.
>
> You can generally think of all other ledgers as "updates" to your wallet.

Every `tick`, all the `effects` of the player's inventory are applied to the player, as well as the `rules` and `events`.

### Rules

The `rules.js` file contains a rules processor, which simply takes the player, and makes any needed changing based on the current state of the player.

For example, if the player's `hunger` currency drops below the threshold, then the rules engine will produce a message saying that the player has starved to death, and then flag that the game is lost.

It also does things like wake the player up from sleeping, and force the player to go to sleep when too much exhaustion has accrued.

### Events

An event is an object with a `name`, a `chance` of occurrence which is a number between 0 and 1, a `condition`, which is a function that takes the game state as an argument and returns a boolean value, and an `effect` function, which is used to produce an effects `ledger` if the event procs.

Every `tick`, the list of possible events is traversed. For each event, a random number is generated and compared against the event's `chance` value. If the number is greater than the `chance` value, and if the `condition` function returns `true`, then the event's `effect` function is called. The ledger and messages generated from this function are added to their respective lists. These ledgers are then added to the `player` object.

For example, the 'Sleep Robbers' event has a 5% chance of occurring, and the `condition` checks to see if the player is sleeping, and also check the exhaustion level of the player to help determine the chance of the event happening. If the event procs, it's `effect` function creates a message indicating that while the player was sleeping some robbers stole some things from the player, and a ledger is created that removes some of the player's `credits` currency.
