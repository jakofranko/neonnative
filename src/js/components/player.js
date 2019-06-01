import React from 'react';

import Stats from './stats';
import Actions from './actions';
import Inventory from './inventory';
import Shop from './shop';

import items from '../utils/items';
import { statsFilter, itemsFilter } from '../utils/player-filters';

class Player extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props.player.get(items.sleeping.type))
    }

    render() {
        const stats = this.props.player.filter((v, k) => statsFilter.includes(k));
        const items = this.props.player.filter((v, k) => itemsFilter.includes(k));
        const keys = this.props.player.keys();

        let itemComps = [];
        let things = [];

        for (let key of keys) {
            things.push(<p key={key}>{key}: {this.props.player.get(key)}</p>);
        }

        return (
            <div className="player">
                <h2>Stats</h2>
                <Stats stats={stats} />
                <h2>Actions</h2>
                <Actions
                    player={this.props.player}
                    updatePlayer={this.props.updatePlayer}
                    updateMessages={this.props.updateMessages} />
                <h2>Inventory</h2>
                <Inventory inventory={items} />
                <h2>Shop</h2>
                <Shop
                    inventory={items} 
                    updatePlayer={this.props.updatePlayer} 
                    updateMessages={this.updateMessages} />
                <h2>things</h2>
                {things}
            </div>
        );
    }
}

export default Player;
