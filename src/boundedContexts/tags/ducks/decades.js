// -----------------------------------------------------------------
// Constants
// -----------------------------------------------------------------

export const DECADES_CALCULATED = 'DECADES_CALCULATED';

const initialState = {
    decades: []
};

// -----------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case DECADES_CALCULATED:
            return {
                ...state,
                decades: action.payload.decades
            }
        default: 
            return state;
    }  
};

// -----------------------------------------------------------------
// Action Creators
// -----------------------------------------------------------------

export const decadesCalculated = (decades) => {
    return {
        type: DECADES_CALCULATED,
        payload: { decades }
    };
};

// -----------------------------------------------------------------
// Selectors
// -----------------------------------------------------------------

const rootSelector = state => state.tags.decades;

export const decadesSelector = state => rootSelector(state).decades;
