import { createStore } from "redux";
import rootReducerFunction from "./Reducers/index";

const store = createStore(rootReducerFunction);

export default store;