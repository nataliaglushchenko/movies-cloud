import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import MovieCard from '../movieCard';

import './sideBar.css';

const propTypes = {
    isShown: PropTypes.bool.isRequired,
    decade: PropTypes.string.isRequired,
    moviesByType: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        place: PropTypes.number.isRequired,
        genres: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired
    })).isRequired,
    selectedGenre: PropTypes.string.isRequired
};

const defaultProps = {

};

function SideBar (props) {
    const {
        className,
        isShown,
        decade,
        moviesByType,
        selectedGenre
    } = props;

    let moviesBySelectedType = '';
    let counter = 0;

    if (moviesByType) {
        moviesBySelectedType = moviesByType
            .map(item => {
                counter = counter + 1;
                return (
                    <MovieCard
                        key={item.place}
                        title={item.title}
                        placeGlobal={item.place}
                        placeLocal={counter}
                        genres={item.genres}
                        year={item.year}
                        duration={item.duration}
                        selectedGenre={selectedGenre}
                    />
                );
            });
    }

    return (
        <div className={cn(
            className,
            'px-3',
            'py-4',
            'bg-light', 
            'rounded',
            'border',
            'shadow-sm',
            {
                'sidebar__hidden': !isShown
            }
        )}>

            <h3>
                {decade} Movies:
            </h3>
            
            <div className={cn('my-3')}>
                Found {moviesByType.length} { moviesByType.length === 1 ? 'Movie' : 'Movies' }
            </div>
            <div className={cn(
                'my-3',
            )}>
                {moviesBySelectedType}
            </div>
        </div>
    );
}

SideBar.propTypes = propTypes;
SideBar.defaultProps = defaultProps;

export default SideBar;