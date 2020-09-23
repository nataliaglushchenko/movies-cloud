import { combineReducers } from 'redux';

import decades from './decades';
import genres from './genres';

const rootReducer = combineReducers({
    genres,
    decades
});

export default rootReducer;
