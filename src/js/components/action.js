import React from 'react';

class Action extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const show = this.props.condition();
        return (
            <span className="action">
                {
                    show ?
                    <button className="ba p2 mr3 mv3" value={this.props.value} onClick={this.props.action} disabled={this.props.sleeping ? 'disabled' : null}>{this.props.name}</button>
                    : null
                }
            </span>
        );
    }
}

export default Action;
