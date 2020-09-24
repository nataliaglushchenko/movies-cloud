import { moviesSelector } from '../../movies/ducks/movies';
import { rulesSelector } from '../../rules/ducks/rules';
import { genresCalculated, searchModeSelector } from '../ducks/genres';

import Tag from '../models/tag';

export const calculateGenres = () => {
    return (dispatch, getState) => {
        const state = getState();

        const rules = rulesSelector(state);
        const mode = searchModeSelector(state);
        const movies = moviesSelector(state);

        const genres = Tag.getGenresTags(movies, rules, mode);
        
        dispatch(genresCalculated(genres));
    };
}; 