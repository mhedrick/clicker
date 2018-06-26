
import { combineReducers } from 'redux';

import {engine} from './engine';
import {game} from './game';

const rootReducer = combineReducers({
    engine,
    game
});

export default rootReducer;