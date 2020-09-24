import { searchModeSelected } from '../ducks/genres';

import { updateGenres } from './updateGenres';

export const selectSearchMode = (mode) => {
    return (dispatch) => {
        dispatch(searchModeSelected(mode));

        dispatch(updateGenres());
    };
}; 