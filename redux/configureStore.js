import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { comments } from './comments';
import { promotions } from './promotions';
import { profiles } from './leaders';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            comments,
            promotions,
            profiles
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}