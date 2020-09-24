import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const propTypes = {
    placeLocal: PropTypes.number.isRequired,
    placeGlobal: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genres: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    selectedGenre: PropTypes.string.isRequired
};

const defaultProps = {

};

function MovieCard (props) {
    const {
        placeLocal,
        placeGlobal,
        title,
        genres,
        year,
        duration,
        selectedGenre
    } = props;

    return (
        <div 
            key={placeGlobal}
            className={cn(
                'my-1',
                'p-2',
                'd-flex',
                'flex-column',
                'align-items-start',
                'border',
                'rounded',
                'shadow',
                'bg-white'
            )}
        >
            <h4 className={cn('p-1')}>
                {`${placeLocal}. (${placeGlobal}.) ${title}`}
            </h4>
            <div 
                className={cn(
                    'p-1', 
                    'font-italic'
                )}
            >
                {
                    genres.split(', ').map(genre => {
                        return (
                            <span 
                                key={genre}
                                className={cn(
                                    {'font-weight-bold': genre.toLowerCase() === selectedGenre}
                                )}
                            >
                                {`${genre} `}
                            </span>
                        );
                    })
                }
            </div>
            <div className={cn('p-1')}>
                Year: {year}
            </div>
            <div className={cn('p-1')}>
                {`Duration: ${duration} min.`}
            </div>
        </div>
    );
}

MovieCard.propTypes = propTypes;
MovieCard.defaultProps = defaultProps;

export default MovieCard;