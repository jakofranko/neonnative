import React from 'react';
import { hot } from "react-hot-loader";
import { effects, sum } from 'merchant.js';
import { Map } from "immutable";

import startingAttributes from './utils/starting-attributes';
import currencies from './utils/currencies';
import items from './utils/items';
import processRules from './utils/rules';

import Player from './components/player';
import Stats from './components/stats';
import Actions from './components/actions';
import Inventory from './components/inventory';
import Dialog from './components/dialog';
import Shop from './components/shop';

const itemsArr = Object.keys(items).map(itemName => items[itemName]);

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ledgers: [],      // [wallet]
            stats: Map(),     // wallet
            chars: Map({      // wallet
                exhaustMax: 10,
                exhaustMin: -10,
                hungerMax: 10,
                hungerMin: -10,
            }),
            inventory: Map(), // wallet
            player: Map(startingAttributes),    // wallet
            condition: {
                sleeping: false
            },
            messages: [],
            lost: false
        }

        this.tick = this.tick.bind(this);
        this.updateStats = this.updateStats.bind(this);
        this.updateInventory = this.updateInventory.bind(this);
        this.updateCondition = this.updateCondition.bind(this);
        this.updateMessages = this.updateMessages.bind(this);

        this.loopId = setInterval(this.tick, 50);
    }

    tick() {
        let { upkeep, condition, messages, lost } = processRules(this.state);

        this.setState(currentState => {
            const inventoryEffects = effects(itemsArr, currentState.inventory);

            return {
                player: sum(currentState.player, upkeep),
                stats: sum(currentState.stats, upkeep),
                inventory: sum(currentState.inventory, inventoryEffects),
                condition,
                messages: currentState.messages.concat(messages),
                lost
            }
        });
    }

    updatePlayer(ledgers) {
        const player = sum(this.state.player, ...ledgers);

        this.setState({
            player
        });
    }

    updateCondition(condition = {}) {
        this.setState(currentState => {
            return {
                condition: Object.assign(currentState.condition, condition)
            };
        });
    }

    updateStats(ledgers) {
        this.setState({
            player: sum(this.state.player, ...ledgers),
            stats: sum(this.state.stats, ...ledgers)
        });
    }

    updateInventory(ledgers) {
        this.setState({
            inventory: sum(this.state.inventory, ...ledgers)
        });
    }

    updateMessages(messages) {
        this.setState(currentState => {
            return {
                messages: currentState.messages.concat(messages)
            }
        })
    }

    render() {
        const lost = this.state.lost;
        if (lost) clearInterval(this.loopId);

        return (
            <div className="app">
                    {lost ?
                        <h1>YOU LOSE</h1>
                        :
                        <div className="dashboard">
                            <Stats stats={this.state.stats} />
                            <Actions
                                stats={this.state.stats}
                                inventory={this.state.inventory}
                                updateInventory={this.updateInventory}
                                updateStats={this.updateStats}
                                updateCondition={this.updateCondition}
                                player={this.state.player}
                                updatePlayer={this.updatePlayer}
                                updateMessages={this.updateMessages}
                                sleeping={this.state.condition.sleeping} />
                            <Inventory inventory={this.state.inventory} />
                        </div>
                    }
                    <Player player={this.state.player} />
                    <Shop inventory={this.state.inventory} updateInventory={this.updateInventory} updateMessages={this.updateMessages} />
                    <Dialog messages={this.state.messages} />
            </div>
        );
    }
}

export default hot(module)(App);
