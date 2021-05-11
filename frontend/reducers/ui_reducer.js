import { combineReducers } from "redux";
import modalReducer from "./modal_reducer";
// import themeReducer from "./theme_reducer";

const uiReducer = combineReducers({
    modal: modalReducer,
    // theme: themeReducer
})

export default uiReducer;