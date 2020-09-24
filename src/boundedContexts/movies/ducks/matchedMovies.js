// -----------------------------------------------------------------
// Constants
// -----------------------------------------------------------------

export const FETCH_MATCHED_MOVIES_STARTED = 'FETCH_MATCHED_MOVIES_STARTED';
export const FETCH_MATCHED_MOVIES_SUCCEEDED = 'FETCH_MATCHED_MOVIES_SUCCEEDED';
export const FETCH_MATCHED_MOVIES_FAILED = 'FETCH_MATCHED_MOVIES_FAILED';

const initialState = {
    matchedMovies: [],
    isLoaded: false,
    isLoading: false
};

// -----------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_MATCHED_MOVIES_STARTED: 
            return {
                ...state,
                isLoading: true,
                isLoaded: false
            }; 

        case FETCH_MATCHED_MOVIES_SUCCEEDED: 
            return {
                ...state,
                isLoading: false,
                matchedMovies: action.payload.matchedMovies,
                isLoaded: true
            }; 

        case FETCH_MATCHED_MOVIES_FAILED:
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

export const fetchMatchedMoviesStarted = () => {
    return {
        type: FETCH_MATCHED_MOVIES_STARTED
    };
};

export const fetchMatchedMoviesSucceeded = (matchedMovies) => {
    return {
        type: FETCH_MATCHED_MOVIES_SUCCEEDED,
        payload: { matchedMovies }
    };
};

export const fetchMatchedMoviesFailed = (error) => {
    return {
        type: FETCH_MATCHED_MOVIES_FAILED,
        payload: error
    };
};

// -----------------------------------------------------------------
// Selectors
// -----------------------------------------------------------------

const rootSelector = state => state.movies.matchedMovies;

export const isMatchedMoviesLoadingSelector = state => rootSelector(state).isLoading;
export const isMatchedMoviesLoadedSelector = state => rootSelector(state).isLoaded;
export const matchedMoviesSelector = state => rootSelector(state).matchedMovies;
