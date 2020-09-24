import Tag from '../../tags/models/tag';

import { 
    fetchMoviesStarted, 
    fetchMoviesSucceeded,
    fetchMoviesFailed 
} from '../ducks/movies';

import { moviesQuantityByDecadesCalculated } from '../../tags/ducks/decades';

import Movie from '../models/movie';

import RULE_MATCH_TYPES_MAP from '../models/ruleMatchTypeMappings';

export const fetchMovies = (genre, mode) => {
    return (dispatch) => {
        const ruleMatchType = RULE_MATCH_TYPES_MAP[mode];
        dispatch(fetchMoviesStarted());
        
        fetch(`http://localhost:4500/matched-movies/${genre}/${ruleMatchType}`)
            .then(res => res.json())
            .then(res => {
                const movies = res.map(Movie.create);
                
                const decades = Tag.getDecadesTags(movies);
                dispatch(moviesQuantityByDecadesCalculated(decades));

                dispatch(fetchMoviesSucceeded(movies));

            })
            .catch(err => {
                dispatch(fetchMoviesFailed(err));
            });
    };
}; 