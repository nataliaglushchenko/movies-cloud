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

const mapStateToProps = (state) => {
    return {
        isLoading: isRulesLoadingSelector(state),
        isLoaded: isRulesLoadedSelector(state),
        searchMode: searchModeSelector(state),
        genres: genresSelector(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchRules: () => dispatch(fetchRules()),
        onSelectSearchMode: (searchMode) => dispatch(selectSearchMode(searchMode))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GenresPage));
