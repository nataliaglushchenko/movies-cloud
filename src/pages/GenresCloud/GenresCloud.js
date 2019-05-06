import React, { Component } from 'React';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { uniq } from 'lodash';
import noop from 'lodash/noop';
import cn from 'classnames';

import Cloud from '../../components/Cloud';
import Tag from '../../components/Tag';
import { getHash } from '../../utitls/hash';

import genresCloudStyles from './GenresCloud.module.scss';
import Toolbar from '../../components/Toolbar/Toolbar';

const PADDING_WEIGHT = 9;
const SEARCH_MODE = {
    SEARCH_BY_MAIN_GENRE: 'searchByMainGenre',
    SEARCH_BY_ALL_GENRES: 'searchByAllGenres'
};

const propTypes = {
    onFetchRules: PropTypes.func.isRequired,
    onSelectItem: PropTypes.func,
    loading: PropTypes.bool,
    isLoaded: PropTypes.bool,
    rules: PropTypes.arrayOf(PropTypes.shape({
        genre: PropTypes.string,
        ruleMatchType: PropTypes.string,
        ruleFlag: PropTypes.string
    })),
    styles: PropTypes.object
};

const defaultProps = {
    onSelectItem: noop,
    loading: false,
    isLoaded: false,
    rules: []
};

class GenresCloud extends Component {
    state = {
        searchMode: SEARCH_MODE.SEARCH_BY_MAIN_GENRE
    }

    componentDidMount() {
        this.props.onFetchRules();
    };

    handleClick = (item) => {
        this.props.onSelectItem(item);
        this.props.history.push(`/view/${item.genre.toLowerCase()}`);
    };

    setSearchByMainGenre = () => {
        if(this.state.searchMode !== SEARCH_MODE.SEARCH_BY_MAIN_GENRE) {
            this.setState({ searchMode: SEARCH_MODE.SEARCH_BY_MAIN_GENRE });
        }
    }

    setSearchByAllGenres = () => {
        if(this.state.searchMode !== SEARCH_MODE.SEARCH_BY_ALL_GENRES) {
            this.setState({ searchMode: SEARCH_MODE.SEARCH_BY_ALL_GENRES });
        }
    }

    render() {
        const { 
            styles, 
            isLoaded, 
            loading, 
            rules 
        } = this.props; 

        let rulesTags = loading ? <div className={cn(styles['Loading'])}>loading ...</div> : null;

        if (!isLoaded) {
            return rulesTags;
        }

        const counts = uniq(rules.map(rule => rule.genre))
            .map(genre => {
                return {
                    count: rules.filter(rule => rule.genre === genre).length,
                    genre: genre
                }
            }
        );

        const updatedRules = rules.map(item => {
                const count = counts.filter(c => c.genre === item.genre);
                return {
                    ...item,
                    count: count[0].count
                }
            });

        const mainGenreRulesTags = updatedRules
            .filter(rule => rule.ruleMatchType === 'startsWith')
            .map(item => (
                <Tag
                    key={getHash(`${item.genre}${item.ruleMatchType}${item.ruleFlag}`)}
                    onClick={() => this.handleClick(item)}
                    padding={item.count * PADDING_WEIGHT}
                    backgroundColor={item.ruleFlag.toLowerCase()}
                >
                    {item.genre}
                </Tag>
            ));

        const containsGenreRulesTags = updatedRules
            .filter(rule => rule.ruleMatchType === 'contains')
            .map(item => (
                <Tag
                    key={getHash(`${item.genre}${item.ruleMatchType}${item.ruleFlag}`)}
                    onClick={() => this.handleClick(item)}
                    padding={item.count * PADDING_WEIGHT}
                    backgroundColor={item.ruleFlag.toLowerCase()}
                >
                    {item.genre}
                </Tag>
            ));

        if (this.state.searchMode === SEARCH_MODE.SEARCH_BY_MAIN_GENRE) {
            rulesTags = mainGenreRulesTags;
        }

        const tabs = [
            {
                serchMode: SEARCH_MODE.SEARCH_BY_MAIN_GENRE,
                title: 'SEARCH BY MAIN GENRE',
                clicked: this.state.searchMode === SEARCH_MODE.SEARCH_BY_MAIN_GENRE,
                onClick: this.setSearchByMainGenre
            }, 
            {
                serchMode: SEARCH_MODE.SEARCH_BY_ALL_GENRES,
                title: 'SEARCH BY ALL GENRES',
                clicked: this.state.searchMode === SEARCH_MODE.SEARCH_BY_ALL_GENRES,
                onClick: this.setSearchByAllGenres
            }];
        
        return (
            <React.Fragment>
                <Toolbar tabs={tabs}/>
                <Cloud className={cn(styles['RulesCloud'])}>
                    {this.state.searchMode === SEARCH_MODE.SEARCH_BY_MAIN_GENRE ? mainGenreRulesTags : containsGenreRulesTags}
                </Cloud>
            </React.Fragment> 
        );
    }
}

GenresCloud.propTypes = propTypes;
GenresCloud.defaultProps = defaultProps;

export default CSSModules(GenresCloud, genresCloudStyles);