import { 
    fetchMoviesStarted, 
    fetchMoviesSucceeded, 
    processMoviesData, 
    fetchMoviesFailed 
} from '../ducks/movies';

export const fetchMovies = () => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch(fetchMoviesStarted());
        
        fetch('http://localhost:4500/movies')
            .then(res => res.json())
            .then(res => {
                dispatch(fetchMoviesSucceeded(res));
                dispatch(processMoviesData(res, state.rules.selectedItem.genre, state.rules.selectedItem.ruleMatchType));
            })
            .catch(err => {
                dispatch(fetchMoviesFailed(err));
            });
    };
}; 