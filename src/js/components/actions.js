import React from 'react';
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
                condition: () => {
                    debugger;
                    return this.props.player.get(currencies.food) && this.props.player.get(currencies.food) > 0
                }
            },
            {
                name: 'sellFood',
                condition: () => this.props.player.get(currencies.food) && this.props.player.get(currencies.food) > 10
            }
        ];
    }

    handleClick(e) {
        e.preventDefault();
        // doAction attempts to perform the action matching the value of the button clicked,
        // which is equivelent to the `name` of the action in the actionList.
        const { newPlayer, condition, messages } = doAction(e.currentTarget.value, this.props.player);

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

export default Actions
