import { combineReducers } from "redux";
import asyncReducer from "./asyncReducer";
import authReducer from "./authReducer";
import projectReducer from "./projectReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    projects: projectReducer,
    async: asyncReducer,
});

export default rootReducer;
