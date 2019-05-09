import React from 'react';
import { hot } from "react-hot-loader";
import { sum } from 'merchant.js';
import { Map } from "immutable";
import currencies from './currencies';
import processRules from './rules';

import Stats from './stats';
import Actions from './actions';

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
            condition: {
                sleeping: false
            },
            lost: false
        }

        this.update = this.update.bind(this);
        this.updateStats = this.updateStats.bind(this);
        this.updateInventory = this.updateInventory.bind(this);
        this.getItems = this.getItems.bind(this);
        this.goToSleep = this.goToSleep.bind(this);

        this.loopId = setInterval(this.update, 50);
    }

    update() {
        let { upkeep, condition, lost } = processRules(this.state);

        this.setState({
            stats: sum(this.state.stats, upkeep),
            condition,
            lost
        });
    }

    getItems() {
        return this.state.wallet.filter(item => {
            console.log(item);
        });
    }

    goToSleep(e) {
        e.preventDefault();
        this.setState(currentState => {
            return {
                condition: Object.assign(currentState.condition, { sleeping: true })
            };
        });
    }

    updateStats(ledgers) {
        this.setState({
            stats: sum(this.state.stats, ...ledgers)
        });
    }

    updateInventory(ledgers) {
        this.setState({
            inventory: sum(this.state.inventory, ...ledgers)
        });
    }

    render() {
        const lost = this.state.lost;
        if (lost) clearInterval(this.loopId);

        return (
            <div>
                {lost
                    ? <h1>YOU LOSE</h1>
                    :
                    <div>
                        <Stats stats={this.state.stats} />
                        <Actions
                            stats={this.state.stats}
                            inventory={this.state.inventory}
                            updateInventory={this.updateInventory}
                            updateStats={this.updateStats}
                            goToSleep={this.goToSleep}
                            sleeping={this.state.condition.sleeping} />
                    </div>
                }
            </div>
        );
    }
}

export default hot(module)(App);
