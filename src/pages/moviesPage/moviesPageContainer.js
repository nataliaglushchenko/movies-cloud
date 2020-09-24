import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MoviesPage from './moviesPage';
import { isMoviesLoadedSelector, isMoviesLoadingSelector, moviesSelector } from '../../boundedContexts/movies/ducks/movies';
import { fetchMovies } from '../../boundedContexts/movies/actions/fetchMovies';
import { decadesSelector } from '../../boundedContexts/tags/ducks/decades';

const mapStateToProps = (state) => {
    return {
        movies: moviesSelector(state),
        isLoaded: isMoviesLoadedSelector(state),
        isLoading: isMoviesLoadingSelector(state),
        decades: decadesSelector(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchMovies: (genre, mode) => dispatch(fetchMovies(genre, mode))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviesPage));