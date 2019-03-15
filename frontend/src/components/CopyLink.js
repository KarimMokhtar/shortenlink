import React from "react";

function myFunction() {
    var copyText = document.getElementById("myInput");
    copyText.select();
    document.execCommand("copy");
}

function CopyLink(props) {
    if (!props.loaded) return <p />;
    return (
        <div className="clipboard">
            <fieldset className="arrowfield">
                <h1>Here is your new short link</h1>
                <div className="arrow bounce">
                    <a className="fa fa-arrow-down fa-2x" href="#" />
                </div>
            </fieldset>
            <div className="copyIcon">
                <input readOnly type="text" value={props.link} id="myInput" />
                <label className="copyButton" onClick={myFunction}>
                    <i className="far fa-clipboard" />
                </label>
            </div>
        </div>
    );
}
export default CopyLink;
