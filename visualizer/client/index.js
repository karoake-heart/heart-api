import React from 'react';
import ReactDOM from "react-dom";
import App from './App';



// Render only in the browser, export otherwise
if (typeof document === "undefined") {
    module.exports = <App />;
} else {
    let state = window.__PRELOADED_STATE__;
    ReactDOM.hydrate(<App objects={state.objects} title={state.title} />, document.getElementById("root"));
}
