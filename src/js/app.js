import React from 'react';
import { hot } from "react-hot-loader";
import { effects, sum } from 'merchant.js';
import { Map } from "immutable";

import startingAttributes from './utils/starting-attributes';
import currencies from './utils/currencies';
import items from './utils/items';
import processRules from './utils/rules';

import Player from './components/player';
import Dialog from './components/dialog';

const itemsArr = Object.keys(items).map(itemName => items[itemName]);

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            player: Map(startingAttributes), // wallet
            messages: [],
            lost: false
        }

        this.tick = this.tick.bind(this);
        this.updatePlayer = this.updatePlayer.bind(this);
        this.updateMessages = this.updateMessages.bind(this);

        this.loopId = setInterval(this.tick, 5000);
    }

    tick() {
        let { updatedPlayer, condition, messages, lost } = processRules(this.state);

        this.setState(currentState => {
            const allEffects = effects(itemsArr, updatedPlayer);
            return {
                player: sum(updatedPlayer, allEffects),
                messages: currentState.messages.concat(messages),
                lost
            }
        });
    }

    updatePlayer(ledgers) {
        this.setState({
            player: sum(this.state.player, ...ledgers)
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
            <div className="app m4 r">
                    {lost ?
                        <h1>YOU LOSE</h1>
                        :
                        <Player
                            player={this.state.player}
                            updatePlayer={this.updatePlayer}
                            updateMessages={this.updateMessages} />
                    }
                    <Dialog messages={this.state.messages} />
            </div>
        );
    }
}

export default hot(module)(App);
