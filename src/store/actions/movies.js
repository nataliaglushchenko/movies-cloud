import * as actionTypes from './actionTypes';
import Movie from '../model/movie';

export const fetchMoviesStart = () => {
    return {
        type: actionTypes.FETCH_MOVIES_START
    };
};

export const fetchMoviesSuccess = (movies) => {
    return {
        type: actionTypes.FETCH_MOVIES_SUCCESS,
        movies: movies
    };
};

export const fetchMoviesFailure = (error) => {
    return {
        type: actionTypes.FETCH_MOVIES_FAILURE,
        error: error
    };
};

export const fetchMovies = () => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch(fetchMoviesStart());
        fetch('http://localhost:4500/movies')
            .then(res => res.json())
            .then(res => {
                dispatch(fetchMoviesSuccess(res));
                dispatch(processMoviesData(res, state.rules.selectedItem.genre, state.rules.selectedItem.ruleMatchType));
            })
            .catch(err => {
                dispatch(fetchMoviesFailure(err));
            });
    };
}; 

export const processMoviesData = (movies, genre, ruleMatchType) => {
    const matchedMovies = Movie.processData(movies, genre, ruleMatchType);
    return {
        type: actionTypes.PROCESS_MOVIES_DATA,
        matchedMovies: matchedMovies
    };
};

