import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MoviesPage from './moviesPage';
import { fetchMatchedMovies } from '../../boundedContexts/movies/actions/fetchMovies';
import { decadesSelector } from '../../boundedContexts/tags/ducks/decades';
import { calculateDecades } from '../../boundedContexts/tags/actions/calculateDecades';

import { 
    isMatchedMoviesLoadedSelector, 
    isMatchedMoviesLoadingSelector, 
    matchedMoviesSelector 
} from '../../boundedContexts/movies/ducks/matchedMovies';

const mapStateToProps = (state) => {
    return {
        movies: matchedMoviesSelector(state),
        isLoaded: isMatchedMoviesLoadedSelector(state),
        isLoading: isMatchedMoviesLoadingSelector(state),
        decades: decadesSelector(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchMovies: (genre, mode) => dispatch(fetchMatchedMovies(genre, mode)),
        onCalculateDecades: (movies) => dispatch(calculateDecades(movies))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviesPage));