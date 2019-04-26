import React from 'react';
import * as m from 'merchant.js';
import { Map } from "immutable";
import currencies from './currencies';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wallet: Map()
        }
    }

    render() {
        const ledger = Map({
            [currencies.exhaustion]: -5,
            [currencies.hunger]: -2
        });
        const ledger2 = Map({
            [currencies.exhaustion]: 50,
            [currencies.hunger]: 20
        });
        console.log(m.sum(this.state.wallet, ledger, ledger2));
        return <h1>hey</h1>;
    }
}

export default App;
