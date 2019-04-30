import React from 'react';

class Stats extends React.Component {

    render() {
        const stats = this.props.stats.keySeq().map(key => {
            return (
                <tr key={key}>
                    <td>{key}</td>
                    <td>{this.props.stats.get(key)}</td>
                </tr>
            );
        });

        return (
            <div className="stats">
                <table>
                    <tbody>
                        {stats}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Stats;
