// -----------------------------------------------------------------
// Constants
// -----------------------------------------------------------------

export const CALCULATE_MOVIES_QUANTITY_BY_DECADES = 'CALCULATE_MOVIES_QUANTITY_BY_DECADES';

const initialState = {
    decades: []
};

// -----------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case CALCULATE_MOVIES_QUANTITY_BY_DECADES:
            return {
                ...state,
                decades: action.payload.decades
            };
        default: 
            return state;
    }  
};

// -----------------------------------------------------------------
// Action Creators
// -----------------------------------------------------------------

export const moviesQuantityByDecadesCalculated = (decades) => {
    return {
        type: CALCULATE_MOVIES_QUANTITY_BY_DECADES,
        payload: { decades }
    }
}

// -----------------------------------------------------------------
// Selectors
// -----------------------------------------------------------------

const rootSelector = state => state.tags.decades;

export const decadesSelector = state => rootSelector(state).decades;
