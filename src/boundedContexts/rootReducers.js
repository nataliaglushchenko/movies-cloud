import { combineReducers } from 'redux';

import genres from './genres/ducks/genres';
import rules from './rules/ducks/rules';
import movies from './movies/ducks/movies';

const rootReducer = combineReducers({
    genres,
    rules,
    movies
});

export default rootReducer;
