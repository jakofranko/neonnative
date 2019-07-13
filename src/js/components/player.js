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

        return (
            <div className="player c6 ph2">
                <div className="r">
                    <div className="c6">
                        <h2 className="mb2">Status</h2>
                        <Stats stats={stats} />
                    </div>
                    <div className="c6">
                        <h2 className="mb2">Inventory</h2>
                        <Inventory inventory={items} />
                    </div>
                </div>
                <hr className="mv4"/>
                <Actions
                    player={this.props.player}
                    updatePlayer={this.props.updatePlayer}
                    updateMessages={this.props.updateMessages} />
                <Shop
                    inventory={items}
                    updatePlayer={this.props.updatePlayer}
                    updateMessages={this.props.updateMessages} />
            </div>
        );
    }
}

export default Player;
