import React from "react";
import ReactDOM from "react-dom";
import App from "./App/Layout/App";
import "./index.css";
import type compose from "redux";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import history from "./history";
import { Router } from "react-router-dom";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
    import.meta.hot.accept();
}
