import React from 'react';
import { hot } from "react-hot-loader";
import * as m from 'merchant.js';
import { Map } from "immutable";
import currencies from './currencies';
import { MagicSword } from './pouch';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ledgers: [],
            wallet: Map({ [currencies.power]: 10 }),
            currentPowerLevel: 5
        }

        this.update = this.update.bind(this);
        this.addExhaustion = this.addExhaustion.bind(this);
        this.addHunger = this.addHunger.bind(this);
        this.buyMagicSword = this.buyMagicSword.bind(this);
        this.sumLedgersToWallet = this.sumLedgersToWallet.bind(this);

        setInterval(this.update, 2000);
    }

    update() {
        this.setState({
            wallet: m.sum(this.state.wallet, m.effects([MagicSword], this.state.wallet, this.state))
        });
    }

    addExhaustion(e) {
        e.preventDefault();
        const ledger = Map({ [currencies.exhaustion]: Math.random() });
        this.setState(currentState => {
            currentState.ledgers.push(ledger);
            return {
                ledgers: currentState.ledgers
            };
        })
    }

    addHunger(e) {
        e.preventDefault();
        const ledger = Map({ [currencies.hunger]: Math.random() });
        this.setState(currentState => {
            currentState.ledgers.push(ledger);
            return {
                ledgers: currentState.ledgers
            };
        })
    }

    buyMagicSword(e) {
        e.preventDefault();
        this.setState({
            wallet: m.add(MagicSword, m.buy(MagicSword, this.state.wallet, this.state))
        });
    }

    sumLedgersToWallet() {
        this.setState({
            wallet: m.sum(this.state.wallet, ...this.state.ledgers)
        }, () => this.setState({
            ledgers: []
        }));
    }

    render() {
        const keys = this.state.wallet.keys();
        let items = [];
        for (let key of keys) {
            items.push(<p key={key}>{key}: {this.state.wallet.get(key)}</p>);
        }
        return (
            <div>
                <dl>
                    <dt># of ledgers</dt>
                    <dd>{this.state.ledgers.length}</dd>
                </dl>
                <h2>wallet</h2>
                {items}
                <button onClick={this.addExhaustion}>Add Exhuastion</button>
                <button onClick={this.addHunger}>Add Hunger</button>
                <button onClick={this.sumLedgersToWallet}>Add Current Ledgers to Wallet</button>
                <button onClick={this.buyMagicSword}>Buy Magic Sword</button>
            </div>
        );
    }
}

export default hot(module)(App);
