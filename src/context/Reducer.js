import { useReducer } from "react";

import REDUCER_ACTIONS from "src/constants/ActionTypes";

const initialState = {
    abilities: [],
};

function MainReducer(prevState, action) {
    switch (action.type) {
        case REDUCER_ACTIONS.ABILITIES:
            return {
                ...prevState,
                abilities: action.payload,
            };
        default:
            return prevState;
    }
}

export function useMainReducer() {
    return useReducer(MainReducer, initialState);
}
