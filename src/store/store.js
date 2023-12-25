import {
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";

// import { userService } from "../services/user.service.js"
// import { userReducer } from "./reducers/user.reducer.js"
import { toyReducer } from "./reducers/toyReducer.js";

const rootReducer = combineReducers({
  toyModule: toyReducer,
  // userModule: userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers());

window.gStore = store;