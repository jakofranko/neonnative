import React from 'react';
import { hot } from "react-hot-loader";
import { sum } from 'merchant.js';
import { Map } from "immutable";
import currencies from './currencies';
import upkeep from './upkeep';
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
            sleeping: false
        }

        this.update = this.update.bind(this);
        this.updateStats = this.updateStats.bind(this);
        this.updateInventory = this.updateInventory.bind(this);
        this.getItems = this.getItems.bind(this);
        this.goToSleep = this.goToSleep.bind(this);

        setInterval(this.update, 50);
    }

    update() {
        let uk = upkeep.default;
        let sleeping = this.state.sleeping;

        if (sleeping && this.state.stats.get(currencies.exhaustion) >= this.state.chars.get('exhaustMax'))
            sleeping = false;
        else if (sleeping)
            uk = upkeep.sleeping;
        else if (this.state.stats.get(currencies.exhaustion) <= this.state.chars.get('exhaustMin'))
            sleeping = true;

        this.setState({
            stats: sum(this.state.stats, uk),
            sleeping
        });
    }

    getItems() {
        console.log(currencies);
        return this.state.wallet.filter(item => {
            console.log(item);
        });
    }

    goToSleep(e) {
        e.preventDefault();
        this.setState({
            sleeping: true
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
        return (
            <div>
                <Stats stats={this.state.stats} />
                <Actions
                    stats={this.state.stats}
                    inventory={this.state.inventory}
                    updateInventory={this.updateInventory}
                    updateStats={this.updateStats}
                    goToSleep={this.goToSleep}
                    sleeping={this.state.sleeping} />
            </div>
        );
    }
}

export default hot(module)(App);
