import React from 'react';

class Inventory extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const invKeys = this.props.inventory.keys();
        let inventory = [];
        for (let k of invKeys)
            inventory.push((<p key={k}>{k}: {this.props.inventory.get(k)}</p>));

        return (
            <div className="inventory">
                {inventory}
            </div>
        );
    }
}

export default Inventory;
