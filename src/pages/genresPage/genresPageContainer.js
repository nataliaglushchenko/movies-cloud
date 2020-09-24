import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import GenresPage from './genresPage';

import {  
    isRulesLoadingSelector, 
    isRulesLoadedSelector
} from '../../boundedContexts/rules/ducks/rules';

import { fetchRules } from '../../boundedContexts/rules/actions/fetchRules';

import { 
    searchModeSelector,
    genresSelector
} from '../../boundedContexts/tags/ducks/genres';

import { selectSearchMode } from '../../boundedContexts/tags/actions/selectSearchMode';
import { calculateGenres } from '../../boundedContexts/tags/actions/calculateGenres';
import { fetchMovies } from '../../boundedContexts/movies/actions/fetchMovies';
import { isMoviesLoadedSelector } from '../../boundedContexts/movies/ducks/movies';

const mapStateToProps = (state) => {
    return {
        isLoading: isRulesLoadingSelector(state),
        isLoaded: isRulesLoadedSelector(state),
        searchMode: searchModeSelector(state),
        genres: genresSelector(state),
        isAllMoviesLoaded: isMoviesLoadedSelector(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchRules: () => dispatch(fetchRules()),
        onFetchAllMovies: () => dispatch(fetchMovies()),
        onSelectSearchMode: (searchMode) => dispatch(selectSearchMode(searchMode)),
        onCalculateGenres: () => dispatch(calculateGenres())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GenresPage));
