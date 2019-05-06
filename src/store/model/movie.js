import uniq from 'lodash/uniq';

class Movie {}

function createMovie(movie) {
    const { place, title, year, decade, genres, duration } = movie;
    return {
        place: place || '',
        title: title || '',
        year: year || 0,
        decade: decade || '',
        genres: genres || '',
        duration: duration || 0
    };
}

function calculateApearenceByMovieDecade(matchedMovies) {
    return uniq(matchedMovies.map(m => m.decade))
        .map(decade => {
            return {
                count: matchedMovies.filter(item => item.decade === decade).length,
                decade: decade
            };
        });
}

function addAppearenceProperty(matchedMovies) {
    const counts = calculateApearenceByMovieDecade(matchedMovies);
    const modifiedMatchedMovies = matchedMovies.map(item => {
        const itemDecade = item.decade;
        const count = counts.filter(c => c.decade === itemDecade);
        return {
            ...item,
            count: count[0].count
        };
    });
    return modifiedMatchedMovies;
}

function filterMoviesByMatchType(movies, genre, ruleMatchType) {
    const matchedMovies = movies
        .map(m => createMovie(m))
        .filter(movie => {
            switch (ruleMatchType) {
                case "contains": 
                    return movie.genres.includes(genre);
                case "startsWith":
                    return movie.genres.startsWith(genre);
                default: 
                    return false;
            }
        });
    return matchedMovies;
}

Movie.processData = function processData(movies, genre, ruleMatchType) {
    const matchedMovies = filterMoviesByMatchType(movies, genre, ruleMatchType);
    const modifiedMatchedMovies = addAppearenceProperty(matchedMovies);
    return modifiedMatchedMovies;
}

export default Movie;