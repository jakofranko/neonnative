import React from 'react';
import events from './events';
import currencies from './currencies';

class Actions extends React.Component {
    constructor(props) {
        super(props);

        this.scrounge = this.scrounge.bind(this);
        this.eat = this.eat.bind(this);
    }

    scrounge(e) {
        e.preventDefault();
        const scroungingHaul = events.scroungeEvent();
        this.props.updateInventory([scroungingHaul]);
    }

    eat(e) {
        e.preventDefault();
        const { hungerTransaction, foodTransaction } = events.eatEvent();
        this.props.updateInventory([foodTransaction]);
        this.props.updateStats([hungerTransaction]);
    }

    render() {
        const hasFood = this.props.inventory.get(currencies.food) && this.props.inventory.get(currencies.food) > 0;
        return (
            <div className="actions">
                <button onClick={this.scrounge} disabled={this.props.sleeping ? 'disabled' : null}>Scrounge</button>
                <button onClick={this.props.goToSleep} disabled={this.props.sleeping ? 'disabled' : null}>Go to Sleep</button>

                {
                    hasFood ?
                    <button onClick={this.eat} disabled={this.props.sleeping ? 'disabled' : null}>Eat {currencies.food}: {this.props.inventory.get(currencies.food)}</button>
                    : null
                }
            </div>
        );
    }
}

export default Actions
