import { SEARCH_MODES } from '../models/searchModes';

// -----------------------------------------------------------------
// Constants
// -----------------------------------------------------------------

export const SEARCH_MODE_SELECTED = 'SEARCH_MODE_SELECTED';

const initialState = {
    searchMode: SEARCH_MODES.SEARCH_BY_ALL_GENRES
};

// -----------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_MODE_SELECTED:
            return {
                ...state,
                searchMode: action.payload.searchMode
            };

        default:
            return state;
    }
}

// -----------------------------------------------------------------
// Action Creators
// -----------------------------------------------------------------

export const searchModeSelected = (searchMode) => {
    return {
        type: SEARCH_MODE_SELECTED,
        payload: { searchMode }
    };
};

// -----------------------------------------------------------------
// Selectors
// -----------------------------------------------------------------

const rootSelector = state => state.genres;

export const searchModeSelector = state => rootSelector(state).searchMode;
