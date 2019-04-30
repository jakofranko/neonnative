import React from 'react';
import { hot } from "react-hot-loader";
import { sum } from 'merchant.js';
import { Map } from "immutable";
import currencies from './currencies';
import upkeep from './upkeep';
import processRules from './rules';

import Stats from './stats';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ledgers: [],
            stats: Map(),
            chars: Map({
                exhaustMax: 10,
                exhaustMin: -10,
                hungerMax: 10,
                hungerMin: -10,
            }),
            wallet: Map(),
            sleeping: false
        }

        this.update = this.update.bind(this);
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

    render() {
        return (
            <div>
                <Stats stats={this.state.stats} />
                <button>Scrounge</button>
                <button onClick={this.goToSleep}>Go to Sleep</button>
            </div>
        );
    }
}

export default hot(module)(App);
