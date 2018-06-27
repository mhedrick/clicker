import { ADD_POWER, BUY_POWER } from '../_actions/game';
import { actions } from '../_actions/engine';

const initialState = {
    power: 0,
    readers: 0
}

export const game = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POWER:
            return Object.assign({}, state, {
                power: state.power + action.amount
            });
        case BUY_POWER:
            return Object.assign({}, state, {
                readers: state.readers + action.amount,
                power: state.power - action.cost
            });
        case actions.LOAD:
            return Object.assign({}, state, action.game);
        case actions.UNSAVE:
            return Object.assign({}, state, initialState);
        default:
            return state;
    }
}
