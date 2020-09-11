import MoviesPage from './moviesPage';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../store/actions';

const mapStateToProps = (state) => {
    return {
        selectedItem: state.rules.selectedItem,
        matchedMovies: state.movies.matchedMovies,
        isLoaded: state.movies.isLoaded
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchMovies: () => dispatch(actions.fetchMovies())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviesPage));