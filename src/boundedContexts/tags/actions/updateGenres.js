import { rulesSelector } from '../../rules/ducks/rules';
import { genresUpdated, searchModeSelector } from '../ducks/genres';

import Tag from '../models/tag';

export const updateGenres = () => {
    return (dispatch, getState) => {
        const state = getState();

        const rules = rulesSelector(state);
        const mode = searchModeSelector(state);

        const genres = Tag.getGenresTags(rules, mode);
        dispatch(genresUpdated(genres));
    };
}; 