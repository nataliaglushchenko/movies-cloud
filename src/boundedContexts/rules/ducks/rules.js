// -----------------------------------------------------------------
// Constants
// -----------------------------------------------------------------

export const FETCH_RULES_STARTED = 'FETCH_RULES_STARTED';
export const FETCH_RULES_SUCCEEDED = 'FETCH_RULES_SUCCEEDED';
export const FETCH_RULES_FAILED = 'FETCH_RULES_FAILED';

const initialState = {
    rules: [],
    isLoading: false,
    isLoaded: false
};

// -----------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_RULES_STARTED: 
            return {
                ...state,
                isLoading: true,
                isLoaded: false
            }; 

        case FETCH_RULES_SUCCEEDED: 
            return {
                ...state,
                isLoading: false,
                rules: action.payload.rules,
                isLoaded: true
            }; 

        case FETCH_RULES_FAILED:
            return {
                ...state,
                isLoading: false,
                isLoaded: false
            };

        default: 
            return state;
    }  
};

// -----------------------------------------------------------------
// Action Creators
// -----------------------------------------------------------------


export const fetchRulesStarted = () => {
    return {
        type: FETCH_RULES_STARTED
    };
};

export const fetchRulesSucceeded = (rules) => {
    return {
        type: FETCH_RULES_SUCCEEDED,
        payload: { rules }
    };
};

export const fetchRulesFailed = (error) => {
    return {
        type: FETCH_RULES_FAILED,
        payload: { error }
    };
};

// -----------------------------------------------------------------
// Selectors
// -----------------------------------------------------------------

const rootSelector = state => state.rules;

export const isRulesLoadingSelector = state => rootSelector(state).isLoading;
export const isRulesLoadedSelector = state => rootSelector(state).isLoaded;
export const rulesSelector = state => rootSelector(state).rules;