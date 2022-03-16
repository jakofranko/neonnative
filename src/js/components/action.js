import React from 'react';
import { startCase } from 'lodash';

class Action extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const show = this.props.condition();
        const {
            value,
            action,
            sleeping,
            name
        } = this.props;

        return (
            <span className="action">
                {
                    show
                    ? <button
                            className="ba p2 mr3 mv3"
                            value={value}
                            onClick={action}
                            disabled={sleeping ? 'disabled' : null}>
                            {startCase(name)}
                        </button>
                    : null
                }
            </span>
        );
    }
}

export default Action;
