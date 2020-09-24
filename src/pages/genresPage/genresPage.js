import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ButtonGroup, Button, Spinner } from 'reactstrap';

import Cloud from '../../components/cloud';

import { SEARCH_MODES } from '../../boundedContexts/tags/models/searchModes';

const propTypes = {
    onFetchRules: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    searchMode: PropTypes.oneOf([SEARCH_MODES.SEARCH_BY_ALL_GENRES, SEARCH_MODES.SEARCH_BY_MAIN_GENRE]).isRequired,
    onSelectSearchMode: PropTypes.func.isRequired,
    genres: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        type: PropTypes.string.isRequired,
        color: PropTypes.string,
        quantity: PropTypes.number.isRequired
    })).isRequired
};

const defaultProps = {
};

function GenresPage(props) {
    const {  
        isLoaded, 
        isLoading,
        onFetchRules,
        history,
        searchMode,
        onSelectSearchMode,
        onCalculateGenres,
        genres,
        onFetchAllMovies,
        isAllMoviesLoaded
    } = props;

    const [countMoviesByGenre, setCountMoviesByGenre] = useState(null);
    const [genreHovered, setGenreHovered] = useState('');
    const [isMoviesCountShown, setIsMoviesCountShown] = useState(false);

    useEffect(() => {
        if (!isLoaded) onFetchRules();
        if (!isAllMoviesLoaded) onFetchAllMovies();
    }, []);  

    useEffect(() => {
        if(isLoaded && searchMode && isAllMoviesLoaded) onCalculateGenres();
    }, [isLoaded, searchMode, isAllMoviesLoaded]);

    const handleHoverTag = (genre) => {
        setGenreHovered(genre);
        const count = genres.find(item => item.type === genre).quantity;
        setCountMoviesByGenre(count);
        setIsMoviesCountShown(true);
    };

    const handleSelectTag = (tag) => {
        const pathname = `/${searchMode}/${tag.type.toLowerCase()}`;
        history.push(pathname);
    };

    if (!isLoaded) {
        return isLoading ? <div className={cn('text-center', 'mt-5')}><Spinner /></div> : '';
    }

    return (
        <>
            <h4 className={cn('text-center')}>
                FIND MOVIES BY GENRE
            </h4>
            <div
                className={cn(
                    'd-flex',
                    'mt-5',
                    'my-2',
                    'flex-row',
                    'align-items-baseline'
                )}
            >
                <div className={cn('col-2')}>
                    SELECT SEARCH MODE 
                </div>
                <ButtonGroup 
                    className={cn(
                        'mx-2',
                        'p-1',
                        'flex-grow-1'
                    )}
                    size="md"
                >
                    <Button
                        className={cn('col-6')}
                        onClick={() => onSelectSearchMode(SEARCH_MODES.SEARCH_BY_ALL_GENRES)}
                        active={searchMode === SEARCH_MODES.SEARCH_BY_ALL_GENRES}
                        color="secondary"
                        outline
                    >
                        SEARCH AMONG ALL MOVIE GENRES
                    </Button>
                    <Button
                        className={cn('col-6')}
                        onClick={() => onSelectSearchMode(SEARCH_MODES.SEARCH_BY_MAIN_GENRE)}
                        active={searchMode === SEARCH_MODES.SEARCH_BY_MAIN_GENRE}
                        color="secondary"
                        outline
                    >
                        SEARCH BY PRINCIPLE MOVIE GENRE
                    </Button>
                </ButtonGroup>
            
            </div>
            
            <div
                className={cn(
                    'd-flex',
                    'flex-column'
                )}
            >
                <div
                    className={cn(
                        'd-flex', 
                        'flex-row'
                    )}
                >
                    <div className={cn(
                        'my-3', 
                        'col-2'
                    )}>
                        SELECT GENRE
                    </div>
                    <div
                        className={cn(
                            'my-3',
                            'text-left',
                            {
                                'moviesPage__countMoviesByType_hidden': !isMoviesCountShown
                            }
                        )}
                    >
                        {genreHovered}: <b>{countMoviesByGenre}</b> { countMoviesByGenre === 1 ? 'Movie' : 'Movies' }
                    </div>
                </div>
                

                {
                    isLoaded && genres.lenght !== 0 && 
                    <div
                        className={cn('d-flex', 'flex-row')}
                    >
                        <div className={cn('col-md-3', 'col-0', 'm-0', 'p-0')}>
                        </div>
                        <Cloud 
                            className={cn('col-md-6', 'col-12')}
                            tags={genres}
                            onHoverItem={handleHoverTag}
                            onSelectItem={handleSelectTag}
                        />
                    </div>
                }
            </div>
        </>
    );
}

GenresPage.propTypes = propTypes;
GenresPage.defaultProps = defaultProps;

export default GenresPage;