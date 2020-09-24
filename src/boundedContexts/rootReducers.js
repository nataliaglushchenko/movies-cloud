import { combineReducers } from 'redux';

import tags from './tags/ducks';
import rules from './rules/ducks/rules';
import movies from './movies/ducks';

const rootReducer = combineReducers({
    tags,
    rules,
    movies
});

export default rootReducer;
