import React from 'react';

class Actions extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="actions">
                <button disabled={this.props.sleeping ? 'disabled' : null}>Scrounge</button>
                <button onClick={this.props.goToSleep} disabled={this.props.sleeping ? 'disabled' : null}>Go to Sleep</button>
            </div>
        );
    }
}

export default Actions
