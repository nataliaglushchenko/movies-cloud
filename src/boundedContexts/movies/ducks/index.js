import { combineReducers } from 'redux';

import movies from './movies';
import matchedMovies from './matchedMovies';

const rootReducer = combineReducers({
    movies,
    matchedMovies
});

export default rootReducer;
