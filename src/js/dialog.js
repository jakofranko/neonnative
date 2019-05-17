import React from 'react';

class Dialog extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const messages = this.props.messages.map((message, i) => <p key={i}>{message}</p>);
        return (
            <div className="dialog">
                {messages.reverse()}
            </div>
        );
    }
}

export default Dialog;
