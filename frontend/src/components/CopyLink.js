import React from "react";

function copyLinkFun() {
    var copyText = document.getElementById("myInput");
    copyText.select();
    document.execCommand("copy");
    $(".toast__container").show();
    $(".toast").show();
    $(".toast__close").click(function(e) {
        e.preventDefault();
        var parent = $(this).parent(".toast");
        parent.fadeOut("slow", function() {
            $(this).hide();
        });
    });
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
                <label className="copyButton" onClick={copyLinkFun}>
                    <i className="far fa-clipboard" />
                </label>
            </div>
            <div className="toast__container" style={{ display: "none" }}>
                <div className="toast__cell">
                    <div className="toast toast--green">
                        <div className="toast__icon">
                            <svg version="1.1" className="toast__svg" x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: "new 0 0 512 512" }}>
                                <g>
                                    <g>
                                        <path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0    c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7    C514.5,101.703,514.499,85.494,504.502,75.496z" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div className="toast__content">
                            <p className="toast__type">Success</p>
                            <p className="toast__message">The link has successfully Copied to clipboard </p>
                        </div>
                        <div className="toast__close">
                            <svg version="1.1" viewBox="0 0 15.642 15.642" enableBackground="new 0 0 15.642 15.642">
                                <path fillRule="evenodd" d="M8.882,7.821l6.541-6.541c0.293-0.293,0.293-0.768,0-1.061  c-0.293-0.293-0.768-0.293-1.061,0L7.821,6.76L1.28,0.22c-0.293-0.293-0.768-0.293-1.061,0c-0.293,0.293-0.293,0.768,0,1.061  l6.541,6.541L0.22,14.362c-0.293,0.293-0.293,0.768,0,1.061c0.147,0.146,0.338,0.22,0.53,0.22s0.384-0.073,0.53-0.22l6.541-6.541  l6.541,6.541c0.147,0.146,0.338,0.22,0.53,0.22c0.192,0,0.384-0.073,0.53-0.22c0.293-0.293,0.293-0.768,0-1.061L8.882,7.821z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CopyLink;
