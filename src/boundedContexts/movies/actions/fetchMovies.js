import { 
    fetchMoviesStarted, 
    fetchMoviesSucceeded,
    fetchMoviesFailed 
} from '../ducks/movies';

import { 
    fetchMatchedMoviesStarted, 
    fetchMatchedMoviesSucceeded,
    fetchMatchedMoviesFailed 
} from '../ducks/matchedMovies';

import Movie from '../models/movie';

import RULE_MATCH_TYPES_MAP from '../models/ruleMatchTypeMappings';

export const fetchMovies = () => {
    return (dispatch) => {
        dispatch(fetchMoviesStarted());
        
        fetch(`http://localhost:4500/movies`)
            .then(res => res.json())
            .then(res => {
                const movies = res.map(Movie.create);
                
                dispatch(fetchMoviesSucceeded(movies));

            })
            .catch(err => {
                dispatch(fetchMoviesFailed(err));
            });
    };
}; 

export const fetchMatchedMovies = (genre, mode) => {
    return (dispatch) => {
        const ruleMatchType = RULE_MATCH_TYPES_MAP[mode];
        dispatch(fetchMatchedMoviesStarted());
        
        fetch(`http://localhost:4500/matched-movies/${genre}/${ruleMatchType}`)
            .then(res => res.json())
            .then(res => {
                const movies = res.map(Movie.create);
                dispatch(fetchMatchedMoviesSucceeded(movies));

            })
            .catch(err => {
                dispatch(fetchMatchedMoviesFailed(err));
            });
    };
}; 