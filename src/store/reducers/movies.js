import * as actionTypes from '../actions/actionTypes';

const initialState = {
    movies: [],
    isLoaded: false,
    loading: false,
    matchedMovies: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_MOVIES_START: 
            return {
                ...state,
                loading: true,
                isLoaded: false
            };            
        case actionTypes.FETCH_MOVIES_SUCCESS: 
            return {
                ...state,
                loading: false,
                movies: action.movies,
                isLoaded: true
            }; 
        case actionTypes.FETCH_MOVIES_FAILURE:
            return {
                ...state,
                loading: false,
                isLoaded: false
            };             
        case actionTypes.PROCESS_MOVIES_DATA:
            return {
                ...state,
                matchedMovies: action.matchedMovies
            }
        default: 
            return state;
    }  
};

export default reducer;