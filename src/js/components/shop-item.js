import React from 'react';

import currencies from '../utils/currencies';

class ShopItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: this.props.item,
        }
    }

    render() {
        const available = this.state.item.qty > 0 && this.state.item.condition(this.props.inventory);

        return available ? (
            <div className="shop-item ba p3">
                <p className="ac">
                    {this.state.item.type}
                    <br/>
                    <button className="mv2 p2 ba" value={this.state.item.type} onClick={this.props.onClick}>Buy ({this.state.item.cost().get(currencies.credits)} Credits)</button>
                </p>
                <p>{this.state.item.description}</p>
            </div>
        ) : null;
    }
}

export default ShopItem;
