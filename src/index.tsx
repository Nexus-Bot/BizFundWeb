import React from "react";
import ReactDOM from "react-dom";
import App from "./App/Layout/App";
import "./index.css";
import type compose from "redux";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import history from "./history";
import { Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
