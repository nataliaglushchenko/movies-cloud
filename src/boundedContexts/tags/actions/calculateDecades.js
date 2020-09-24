import { decadesCalculated } from '../ducks/decades';

import Tag from '../models/tag';

export const calculateDecades = (movies) => {
    return (dispatch) => {
        const decades = Tag.getDecadesTags(movies);
        dispatch(decadesCalculated(decades));
    };
}; 