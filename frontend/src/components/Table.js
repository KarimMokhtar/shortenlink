import React, { Component } from "react";
import key from "weak-key";
class Table extends Component {
    constructor() {
        super();
    }
    render() {
        const data = this.props.data;
        if (!data.length) return <p>Nothing to show</p>;
        return (
            <div className="column">
                <h2 className="subtitle">
                    Showing <strong>{data.length} items</strong>
                </h2>
                <table className="table is-striped">
                    <thead>
                        <tr>
                            {Object.entries(data[0]).map(el => (
                                <th key={key(el)}>{el[0]}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(el => (
                            <tr key={el.id}>
                                {Object.entries(el).map(el => (
                                    <td key={key(el)}>{el[1]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Table;
