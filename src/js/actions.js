import React from 'react';
import Action from './action';
import doEvent from './events';
import currencies from './currencies';

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
                condition: () => this.props.inventory.get(currencies.food) && this.props.inventory.get(currencies.food) > 0
            }
        ];
    }

    handleClick(e) {
        e.preventDefault();
        const { inventory, stats, condition } = doEvent(e.currentTarget.value);
        this.props.updateInventory([inventory]);
        this.props.updateStats([stats])
        this.props.updateCondition(condition);
    }

    render() {
        const actions = this.actionList.map(action => <Action key={action.name} name={action.name} value={action.name} action={this.handleClick} condition={action.condition} sleeping={this.props.sleeping} />)
        return (
            <div className="actions">
                {actions}
            </div>
        );
    }
}

export default Actions
