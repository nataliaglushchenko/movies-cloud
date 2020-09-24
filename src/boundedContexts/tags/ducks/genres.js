import { SEARCH_MODES } from '../models/searchModes';

// -----------------------------------------------------------------
// Constants
// -----------------------------------------------------------------

export const SEARCH_MODE_SELECTED = 'SEARCH_MODE_SELECTED';
export const GENRES_CALCULATED = 'GENRES_CALCULATED';

const initialState = {
    searchMode: SEARCH_MODES.SEARCH_BY_ALL_GENRES,
    genres: []
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

        case GENRES_CALCULATED: 
            return {
                ...state,
                genres: action.payload.genres
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

export const genresCalculated = (genres) => {
    return {
        type: GENRES_CALCULATED,
        payload: { genres }
    };
};

// -----------------------------------------------------------------
// Selectors
// -----------------------------------------------------------------

const rootSelector = state => state.tags.genres;

export const searchModeSelector = state => rootSelector(state).searchMode;
export const genresSelector = state => rootSelector(state).genres;