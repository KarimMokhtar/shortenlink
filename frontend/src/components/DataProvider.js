import React, { Component } from "react";
import CopyLink from "./CopyLink";
import NotFound from "./NotFound";
class DataProvider extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            newLink: "",
            link: "",
            notFound: false
        };
    }
    updateCurrentLink = e => {
        this.setState({ newLink: e.target.value });
    };
    submit() {
        const data = new URLSearchParams();
        data.append("longUrl", this.state.newLink);
        fetch(this.props.endpoint, {
            method: "POST",
            body: data
        })
            .then(res => res.json())
            .then(res => {
                if (res.code === "None" || res.code === "time") this.setState({ notFound: true, loaded: true });
                else this.setState({ notFound: false, link: window.location.href + "url/?q=" + res.code, newLink: this.state.newLink, loaded: true });
            });
    }
    render() {
        return (
            <div className="s002">
                <form>
                    <fieldset>
                        <legend>Now you can cut your long link!</legend>
                    </fieldset>
                    <div className="inner-form">
                        <div className="input-field first-wrap">
                            <input id="search" type="text" placeholder="What is your long link?" onChange={this.updateCurrentLink} />
                        </div>
                        <div className="input-field fifth-wrap">
                            <button className="btn-search" type="button" onClick={this.submit.bind(this)}>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
                {this.state.notFound && <NotFound />}
                {!this.state.notFound && <CopyLink link={this.state.link} loaded={this.state.loaded} />}
            </div>
        );
    }
}

export default DataProvider;
