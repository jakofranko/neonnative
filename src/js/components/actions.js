import React from 'react';
import PropTypes from 'prop-types';
import Action from './action';
import doAction from '../utils/actions';
import currencies from '../utils/currencies';
import items from '../utils/items';

class Actions extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        // All actions in the below list must have a corresponding
        // function in src/js/utils/actions.js that matches exactly
        // the `name` of the action.
        this.actionList = [
            {
                name: 'sleep',
                condition: () => true
            },
            {
                name: 'scrounge',
                condition: () => true
            },
            {
                name: 'eat',
                condition: () => this.props.player.get(currencies.food) && this.props.player.get(currencies.food) > 0
            },
            {
                name: 'sellFood',
                condition: () => this.props.player.get(currencies.food) && this.props.player.get(currencies.food) > 10
            },
            {
                name: 'takeMellow',
                condition: () => this.props.player.get(currencies.mellow) && this.props.player.get(currencies.mellow) > 0
            }
        ];
    }

    handleClick(e) {
        e.preventDefault();
        // doAction attempts to perform the action matching the value of the button clicked,
        // which is equivelent to the `name` of the action in the actionList.
        const { newPlayer, messages } = doAction(e.currentTarget.value, this.props.player);

        this.props.updatePlayer([newPlayer]);
        this.props.updateMessages(messages);
    }

    render() {
        const actions = this.actionList.map(action => (
            <Action
                key={action.name}
                name={action.name}
                value={action.name}
                action={this.handleClick}
                condition={action.condition}
                sleeping={this.props.player.get(items.sleeping.type)}
            />
        ));
        return (
            <div className="actions mb4">
                {actions}
            </div>
        );
    }
}

Actions.propTypes = {
    player: PropTypes.object,
    updatePlayer: PropTypes.func,
    updateMessages: PropTypes.func,
}

export default Actions
