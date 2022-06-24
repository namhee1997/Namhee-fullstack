import { applyMiddleware, compose, createStore } from "redux";
import rootReducerFunction from "./Reducers/index";
import { persistStore } from 'redux-persist';
import createRootReducer from './Reducers/LoginUser';
import { createBrowserHistory } from 'history';
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from 'connected-react-router';
import { createStateSyncMiddleware } from 'redux-state-sync';

// 

export const history = createBrowserHistory({ basename: 'base-name' });

const reduxStateSyncConfig = {
    whitelist: [
        'APP_START_UP_COMPLETE',
    ]
}

const rootReducer = createRootReducer(history);
const middleware = [
    routerMiddleware(history),
    thunkMiddleware,
    createStateSyncMiddleware(reduxStateSyncConfig),
]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reduxStore = createStore(
    rootReducer,
    // rootReducerFunction,//
    composeEnhancers(applyMiddleware(...middleware)),
)

// 

export const dispatch = reduxStore.dispatch;

export const persistor = persistStore(reduxStore);
const store = createStore(rootReducerFunction);

export default store;