import React from 'react';

class Stats extends React.Component {

    render() {
        const stats = this.props.stats.keySeq().map(key => {
            return (
                <tr key={key}>
                    <td>{key}</td>
                    <td>{this.props.stats.get(key).toFixed(2)}</td>
                </tr>
            );
        });

        return (
            <div className="stats mb4">
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
