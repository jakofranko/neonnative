import React from 'react';

import Stats from './stats';

import { statsFilter, itemsFilter } from '../utils/player-filters';

class Player extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const stats = this.props.player.filter((v, k) => statsFilter.includes(k));
        const items = this.props.player.filter((v, k) => itemsFilter.includes(k));
        const keys = this.props.player.keys();

        let itemComps = [];
        let things = [];

        items.forEach((v, k) => console.log(k, v));

        for (let key of keys) {
            things.push(<p key={key}>{key}: {this.props.player.get(key)}</p>);
        }

        return (
            <div className="player">
                <h2>Stats</h2>
                <Stats stats={stats} />
                {things}
            </div>
        );
    }
}

export default Player;
