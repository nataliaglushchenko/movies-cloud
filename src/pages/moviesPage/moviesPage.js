import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Badge, Spinner } from 'reactstrap';

import Cloud from '../../components/cloud';
import SideBar from '../../components/sideBar';
import { SEARCH_MODES } from '../../boundedContexts/tags/models/searchModes';

import './moviesPage.css';

const propTypes = {
    onFetchMovies: PropTypes.func.isRequired,
    selectedRule: PropTypes.shape({
        genre: PropTypes.string,
        ruleMatchType: PropTypes.string,
        ruleFlag: PropTypes.string,
        ruleId: PropTypes.number,
        count: PropTypes.number
    }),
    isRuleSelected: PropTypes.bool,
    matchedMovies:  PropTypes.arrayOf(PropTypes.shape({
        place: PropTypes.number,
        title: PropTypes.string,
        year: PropTypes.number,
        decade: PropTypes.string,
        genre: PropTypes.string,
        duration: PropTypes.number
    })),
    styles: PropTypes.object
};

const defaultProps = {
    selectedRule: null,
    matchedMovies: []
};

function MoviesPage (props) {
    const { 
        movies,
        isLoaded,
        isLoading,
        decades,
        onFetchMovies,
        location,
        match,
    } = props;

    const [selectedDecade, setSelectedDecade] = useState('');
    const [decadeHovered, setDecadeHovered] = useState('');
    const [isSidebarShown, setIsSidebarShown] = useState(false);
    const [moviesByType, setMoviesByType] = useState([]);
    const [countMoviesByType, setCountMoviesByType] = useState(null);
    const [isMoviesCountShown, setIsMoviesCountShown] = useState(false);

    const { params } = match;
    const { mode, genre } = params;

    useEffect(() => {
        onFetchMovies(genre, mode);
    }, [location]);

    const handleHover = (decade) => {
        setDecadeHovered(decade);
        const count = movies
            .filter(item => item.decade === decade)
            .length;
        
        setCountMoviesByType(count);
        setIsMoviesCountShown(true);
    };

    const handleMouseOut = () => {
        setIsMoviesCountShown(false);
        setDecadeHovered(null);
    };

    const handleClick = (tag) => {
        setSelectedDecade(tag.type);

        const moviesByType = movies.filter(item => item.decade === tag.type);
        setMoviesByType(moviesByType);

        setIsSidebarShown(true);
    };

    if (!isLoaded) {
        return isLoading ? <div className={cn('text-center', 'mt-5')}><Spinner /></div> : '';
    }
    return (
        <>
            <h4 className={cn('text-center')}>
                {`FIND ${genre.toUpperCase()} MOVIES BY DECADE`}
            </h4>
            <div
                className={cn(
                    'd-flex',
                    'flex-md-row',
                    'flex-column',
                    'justify-content-md-around',
                    'justify-content-start',
                    'align-items-start',
                    'm-2'
                )}
            >
                <div
                    className={cn('col-md-6', 'col-12')}
                >
                    <div
                        className={cn(
                            'my-4',
                            'd-flex',
                            'flex-row',
                            'align-items-baseline',
                            'h-100'
                        )}
                    >
                        <div>
                            SELECTED SEARCH MODE:
                        </div>
                        <Badge
                            className={cn('mx-2')}
                        >
                            { mode === SEARCH_MODES.SEARCH_BY_ALL_GENRES && `SEARCH BY ALL GENRES`}
                            { mode === SEARCH_MODES.SEARCH_BY_MAIN_GENRE && `SEARCH BY PRINCIPLE GENRE`}
                        </Badge>
                    </div>
                    <div
                        className={cn(
                            'my-4',
                        )}
                    >
                        {`FOUND ${movies.length} ${movies.length === 1 ? 'MOVIE' : 'MOVIES'}`}
                    </div>
                    <div
                        className={cn(
                            'my-4',
                        )}
                    >
                        { isLoaded ? 'Click on the decade to see the movies': '' }
                    </div>
                    <div
                        className={cn(
                            'my-4',
                            'text-left',
                            {
                                'moviesPage__countMoviesByType_hidden': !isMoviesCountShown
                            }
                        )}
                    >
                        {decadeHovered}: <b>{countMoviesByType}</b> { countMoviesByType === 1 ? 'Movie' : 'Movies' }
                    </div>

                    {
                        isLoaded && decades.length !== 0 &&
                        <Cloud
                            tags={decades}
                            onSelectItem={handleClick}
                            selectedItem={selectedDecade}
                            onHoverItem={handleHover}
                            onMouseOut={handleMouseOut}
                        />
                    }
                </div>
                <SideBar
                    className={cn(
                        'my-4',
                        'col-md-6',
                        'col-12'
                    )}
                    isShown={isSidebarShown}
                    decade={selectedDecade}
                    moviesByType={moviesByType}
                    selectedGenre={genre}
                />
            </div>
        </>
    );
}

MoviesPage.propTypes = propTypes;
MoviesPage.defaultProps = defaultProps;

export default MoviesPage;