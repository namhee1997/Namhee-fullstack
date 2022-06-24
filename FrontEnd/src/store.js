import { createStore } from "redux";
import rootReducerFunction from "./Reducers/index";
import { persistStore } from 'redux-persist';
import createRootReducer from './Reducers/LoginUser';
import { createBrowserHistory } from 'history';


const store = createStore(rootReducerFunction);
const isLogin = createRootReducer();

const isLoginUser = createStore(isLogin);
export const persistor = persistStore(isLoginUser);
export default store;