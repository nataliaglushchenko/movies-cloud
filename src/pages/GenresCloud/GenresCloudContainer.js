import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import GenresCloud from './GenresCloud';
import * as actions from '../../store/actions';

const mapStateToProps = (state) => {
    return {
        rules: state.rules.rules,
        isLoaded: state.rules.isLoaded,
        loading: state.rules.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchRules: () => dispatch(actions.fetchRules()),
        onSelectItem: (item) => dispatch(actions.selectItem(item))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GenresCloud));