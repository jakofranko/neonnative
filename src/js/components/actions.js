import React from 'react';
import Action from './action';
import doEvent from '../utils/events';
import currencies from '../utils/currencies';
import items from '../utils/items';

class Actions extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

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
            }
        ];
    }

    handleClick(e) {
        e.preventDefault();
        const { newPlayer, condition, messages } = doEvent(e.currentTarget.value, this.props.player);

        this.props.updatePlayer([newPlayer]);
        this.props.updateMessages(messages);
    }

    render() {
        const actions = this.actionList.map(action => <Action key={action.name} name={action.name} value={action.name} action={this.handleClick} condition={action.condition} sleeping={this.props.player.get(items.sleeping.type)} />)
        return (
            <div className="actions mb4">
                {actions}
            </div>
        );
    }
}

export default Actions
