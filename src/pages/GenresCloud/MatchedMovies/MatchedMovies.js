import React, { Component } from 'React';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import cn from 'classnames';
import uniqBy from 'lodash/uniqBy';

import { getHash } from '../../../utitls/hash';
import Cloud from '../../../components/Cloud';
import Tag from '../../../components/Tag';

import styles from './MatchedMovies.module.scss';

const PADDING_WEIGHT = 10;

const RULE_MATCH_TYPE = {
    CONTAINS: 'contains',
    STARTS_WITH: 'startsWith'
};

const propTypes = {
    onFetchMovies: PropTypes.func.isRequired,
    selectedItem: PropTypes.shape({
        genre: PropTypes.string,
        ruleMatchType: PropTypes.string,
        ruleFlag: PropTypes.string
    }),
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
    selectedItem: null,
    matchedMovies: []
};

class MatchedMovies extends Component {
    state = {
        tagClicked: null,
        showSidebar: false,
        moviesByType: []
    }

    componentDidMount() {
        this.props.onFetchMovies();
    }

    handleHover = (decade) => {
        const count = this.props.matchedMovies
            .filter(item => item.decade === decade)
            .length;  
       this.setState({countMoviesByType: count, showSidebar: true});
    }

    handleClick = (decade) => {
        const moviesByType = this.props.matchedMovies
            .filter(item => item.decade === decade)
        this.setState({moviesByType: moviesByType, tagClicked: decade});
    }

    handleGoBackClick = () => {
        this.props.history.goBack();
    }

    render() {
        const { 
            styles, 
            matchedMovies, 
            isLoaded 
        } = this.props;
    
        let layout = null;
        let heading = null;

        if (isLoaded && matchedMovies.length === 0) {
            heading = <div className={cn(styles['Heading'])}>
                THERE IS NO MATCHED MOVIES YET
            </div>;
        }

        if (isLoaded && matchedMovies.length != 0) {
            heading = <h2 className={cn(styles['Heading'])}>
                <span style={{ color: this.props.selectedItem.ruleFlag }}>                        
                    {this.props.selectedItem.genre.toUpperCase()}
                </span> 
                <span>
                &ensp;
                    {this.props.selectedItem.ruleMatchType===RULE_MATCH_TYPE.CONTAINS ? ' is one of all movie genres here' : ' is the main movie genre here'}
                </span>
            </h2>;

            const decades = uniqBy(matchedMovies, 'decade');

            const typesTags  = decades
                .map(item => {
                    return (
                        <Tag 
                            key={getHash(`${item.decade}${item.place}`)}
                            onMouseOver={() => this.handleHover(item.decade)}
                            onClick={() => this.handleClick(item.decade)}
                            clicked={this.state.tagClicked === item.decade}
                            padding={item.count*PADDING_WEIGHT}
                            backgroundColor={this.props.selectedItem.ruleFlag.toLowerCase()}
                        >
                            {item.decade}
                        </Tag>
                    );
                }   
            );

            let moviesBySelectedType = null;

            if (this.state.moviesByType) {
                moviesBySelectedType = this.state.moviesByType
                    .map(item => {
                        return (
                            <div 
                                key={item.place}
                                className={cn(styles['MovieDescription'])}
                            >
                                <h4 className={cn(styles['MovieTitle'])}>
                                    {item.title}
                                </h4>
                                <div className={cn(styles['MovieGenres'])}>
                                    {item.genres.split(', ').map(genre => {
                                        return <span key={genre} style={{ color: genre==this.props.selectedItem.genre ? this.props.selectedItem.ruleFlag: null }}>
                                            {`${genre} `}
                                        </span>
                                    })}
                                </div>
                                <div className={cn(styles['MovieYear'])}>
                                    Year: {item.year}
                                </div>
                                <div className={cn(styles['MovieDuration'])}>
                                    {`Duration: ${item.duration} min.`}
                                </div>
                            </div>
                        );
                    });

                layout = <div className={cn(styles['Layout'])}>
                    <div className={cn(styles['TypesCloud'])}>
                        <Cloud>
                            {typesTags}
                        </Cloud>
                    </div>
                    <div className={cn(
                        styles['Sidebar'], 
                        {
                            [styles['Hidden']]: !this.state.showSidebar
                        }
                    )}>
                        <h3>
                            DETAILS
                        </h3>
                        <div className={cn(styles['TotalMatches'])}>
                            {`TOTAL MATCHES: `}
                            <span style={{ color: this.props.selectedItem.ruleFlag, fontWeight: 'bold' }}>
                                {this.state.countMoviesByType}
                            </span>
                        </div>
                        <div className={cn(
                            styles['TotalMatches'],
                            {
                                [styles['Hidden']]: !this.state.tagClicked
                            })}>
                                MOVIES: {moviesBySelectedType}
                        </div>
                    </div>
                </div>
            }
        };

        return (
            <React.Fragment>
                {heading}
                <button 
                    className={cn(styles['GoBackButton'])} 
                    onClick={this.handleGoBackClick}
                >
                    BACK
                </button>
                {layout}
            </React.Fragment>
            
        )
    }
}

MatchedMovies.propTypes = propTypes;
MatchedMovies.defaultProps = defaultProps;

export default CSSModules(MatchedMovies, styles);