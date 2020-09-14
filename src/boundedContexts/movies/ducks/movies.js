import Movie from '../models/movie';

// -----------------------------------------------------------------
// Constants
// -----------------------------------------------------------------

export const FETCH_MOVIES_STARTED = 'FETCH_MOVIES_STARTED';
export const FETCH_MOVIES_SUCCEEDED = 'FETCH_MOVIES_SUCCEEDED';
export const FETCH_MOVIES_FAILED = 'FETCH_MOVIES_FAILED';

export const PROCESS_MOVIES_DATA = 'PROCESS_MOVIES_DATA';

const initialState = {
    movies: [],
    isLoaded: false,
    isLoading: false,
    matchedMovies: []
};

// -----------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_MOVIES_STARTED: 
            return {
                ...state,
                isLoading: true,
                isLoaded: false
            }; 

        case FETCH_MOVIES_SUCCEEDED: 
            return {
                ...state,
                isLoading: false,
                movies: action.payload.movies,
                isLoaded: true
            }; 

        case FETCH_MOVIES_FAILED:
            return {
                ...state,
                isLoading: false,
                isLoaded: false
            }; 

        case PROCESS_MOVIES_DATA:
            return {
                ...state,
                matchedMovies: action.payload.matchedMovies
            };

        default: 
            return state;
    }  
};

// -----------------------------------------------------------------
// Action Creators
// -----------------------------------------------------------------

export const fetchMoviesStarted = () => {
    return {
        type: FETCH_MOVIES_STARTED
    };
};

export const fetchMoviesSucceeded = (movies) => {
    return {
        type: FETCH_MOVIES_SUCCEEDED,
        payload: { movies }
    };
};

export const fetchMoviesFailed = (error) => {
    return {
        type: FETCH_MOVIES_FAILED,
        payload: error
    };
};

export const processMoviesData = (movies, genre, ruleMatchType) => {
    const matchedMovies = Movie.processData(movies, genre, ruleMatchType);
    return {
        type: PROCESS_MOVIES_DATA,
        payload: { matchedMovies }
    };
};

// -----------------------------------------------------------------
// Selectors
// -----------------------------------------------------------------

const rootSelector = state => state.movies;

export const isMoviesLoadingSelector = state => rootSelector(state).isLoading;
export const isMoviesLoadedSelector = state => rootSelector(state).isLoaded;
export const moviesSelector = state => rootSelector(state).movies;
export const matchedMoviesSelector = state => rootSelector(state).matchedMovies;
