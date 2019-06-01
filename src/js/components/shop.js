import React from 'react';
import { Map } from 'immutable';
import { add, buy, inTheBlack } from 'merchant.js';

import ShopItem from './shop-item';

import items from '../utils/items';
import { camelCase } from '../utils/strings';

class Shop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemNames: Object.keys(items),
            items
        };

        this.purchase = this.purchase.bind(this);
    }

    purchase(e) {
        e.preventDefault();
        const itemName = e.target.value;
        const item = items[camelCase(itemName)];
        if (inTheBlack(buy(item, this.props.inventory))) {
            const cost = buy(item, Map({}));
            const transaction = add(item, Map({}));

            this.setState(currentState => {
                const updatedQuantity = item.qty - 1;
                item.qty = updatedQuantity;
                return {
                    items: Object.assign(items, { [itemName]: item })
                };
            }, () => this.props.updatePlayer([cost, transaction]));
        } else {
            console.log("Cannot purchase:")
            console.log(item);
            console.log(this.props.inventory);
            console.log(buy(item, this.props.inventory));
            this.props.updateMessages(["You do not have enough money for that."]);
        }
    }

    render() {
        const i = this.state.itemNames.map(name => <ShopItem key={name} inventory={this.props.inventory} item={this.state.items[name]} onClick={this.purchase} />);

        return (
            <div className="shop">
                {i}
            </div>
        );
    }
}

export default Shop;
