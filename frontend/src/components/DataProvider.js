import React, { Component } from "react";
import Table from "./Table";

class DataProvider extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loaded: false,
            placeholder: "loading..."
        };
    }
    componentDidMount() {
        fetch(this.props.endpoint)
            .then(response => {
                if (response.status !== 200) {
                    return this.setState({ placeholder: "ops... something went wrong" });
                }
                return response.json();
            })
            .then(data => {
                this.setState({ data: data, loaded: true });
            });
    }
    render() {
        const { data, loaded, placeholder } = this.state;
        return loaded ? <Table data={data} /> : <p>{placeholder}</p>;
    }
}

export default DataProvider;
