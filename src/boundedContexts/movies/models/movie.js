class Movie {}

Movie.create = function createMovie(movie) {
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

export default Movie;