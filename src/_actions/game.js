import { actions } from './engine';

export const ADD_POWER = 'game.add_power';
export const BUY_POWER = 'game.buy_power';

export function addPower(amount) {
    return (dispatch) => {
        dispatch({
            type: ADD_POWER,
            amount
        });
        dispatch({ type: actions.UPDATE });
    }
};

export function buyPower(amount) {
    return (dispatch, getState) => {
        const { game } = getState();
        const { power, readers } = game;
        const cost = Math.floor(10 * Math.pow(1.1, readers));
        if (cost <= power) {
            dispatch({
                type: BUY_POWER,
                amount,
                cost
            });
            dispatch({ type: actions.UPDATE });
        }
    }
}