import { searchModeSelected } from '../ducks/genres';

export const selectSearchMode = (mode) => {
    return (dispatch) => {
        dispatch(searchModeSelected(mode));
    };
}; 