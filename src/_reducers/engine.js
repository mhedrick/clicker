
import { actions } from '../_actions/engine';

const initialState = {
    lastUpdate: 0,
    lastSave: 0
}

export const engine = (state = {...initialState, lastSave: Date.now(), lastUpdate: Date.now()}, action) => {
    switch (action.type) {
        // this needs to be middleware
        case actions.SAVE:
        case actions.UNSAVE:
        case actions.LOAD:
            return Object.assign({}, state, {
                lastUpdate: Date.now(),
                lastSave: Date.now()
            });
        case actions.UPDATE:
            return Object.assign({}, state, {
                lastUpdate: Date.now()
            });
        default:
            return state;
    }
}
