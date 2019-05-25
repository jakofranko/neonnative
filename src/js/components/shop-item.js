import React from 'react';

class ShopItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: this.props.item,
        }
    }

    render() {
        const available = this.state.item.qty > 0 && this.state.item.condition(this.props.inventory);
        console.log(this.state.item)
        return (
            <span className="shop-item">
                {available &&
                    <span className="shop-item-wrapper">
                        <p>{this.state.item.type}</p>
                        <button value={this.state.item.type} onClick={this.props.onClick}>Buy</button>
                        <p>{this.state.item.description}</p>
                    </span>
                }
            </span>
        );
    }
}

export default ShopItem;
