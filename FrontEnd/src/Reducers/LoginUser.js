import { combineReducers } from 'redux';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import userReduceLogin from './userReducerLogin';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'userLogin',
    whitelist: ['isLoggedIn', 'userInfo']
};

export default (history) => combineReducers({
    user: persistReducer(userPersistConfig, userReduceLogin),
})