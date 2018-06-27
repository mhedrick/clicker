const START_TICK = 'engine.start_tick';
const SAVE = 'engine.save';
const UNSAVE = 'engine.unsave';
const LOAD = 'engine.load';
const UPDATE = 'engine.update';

export const actions = { START_TICK, SAVE, UNSAVE, LOAD, UPDATE };

export function save() {
    return (dispatch, getState) => {
        const { game } = getState();
        // todo: polyfill this once everythings in a set STATE (get it)
        localStorage.setItem('save', JSON.stringify(game));
        dispatch({
            type: SAVE
        });
    }
}

export function unsave() {
    return (dispatch) => {
        // todo: polyfill this once everythings in a set STATE (get it)
        localStorage.removeItem('save');
        dispatch({
            type: UNSAVE
        });
    }
}

export function load() {
    return (dispatch) => {
        let save = localStorage.getItem("save");
        if (save) {
            let savegame = JSON.parse(save);
            dispatch({type: load, savegame})
        }
    }
}