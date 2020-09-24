import uniq from 'lodash/uniq';
import RULE_MATCH_TYPES_MAP from '../../movies/models/ruleMatchTypeMappings';
import { RULE_MATCH_TYPES } from '../../rules/models/rulesMatchTypes';

class Tag {}

Tag.create = function createTag(tag) {
    const { id, type, quantity, color } = tag;
    return {
        id: id || null,
        type: type || '',
        color: color || '',
        quantity: Number(quantity) || 0,
    };
}

Tag.createEmpty = function createEmpty() {
    return {
        id: null,
        type: '',
        color: '',
        quantity: 0
    };
};

export function calculateQuantityByGenres (movies, rules, ruleMatchType) {
    const genres = uniq(rules.map(item => item.genre));

    const calculatedQuantities = genres.map(genre => {
        const matchedMoviesQuantity = movies.filter(movie => {
            switch (ruleMatchType) {
                case RULE_MATCH_TYPES.CONTAINS: 
                    return movie.genres.includes(genre);
                case RULE_MATCH_TYPES.STARTS_WITH:
                    return movie.genres.startsWith(genre);
                default: 
                    return false;
            }
        }).length;

        return {
            quantity: matchedMoviesQuantity,
            type: genre
        };
    });

    return calculatedQuantities;
}

function calculateQuantityByDecades(data) {
    return uniq(data.map(item => item.decade))
        .map(decade => {
            return {
                quantity: data.filter(item => item.decade === decade).length,
                type: decade
            };
        });
}

function addQuantityProperty(data, quantities) {
    return data.map(item => {
        const quantity = quantities.find(q => q.type === item.genre).quantity;
        const tag = {
            id: item.ruleId,
            type: item.genre, 
            color: item.color,
            quantity: quantity
        }
        return Tag.create(tag);
    });
}

Tag.getDecadesTags = function getDecadesTags(movies) {
    const rawDecades = calculateQuantityByDecades(movies);
    const decades = rawDecades.map(Tag.create);
    return decades;
}

Tag.getGenresTags = function getGenresTags(movies, rules, mode) {
    const ruleMatchType = RULE_MATCH_TYPES_MAP[mode];
    const rawRules = rules.filter(rule => rule.ruleMatchType === ruleMatchType);

    const quantities = calculateQuantityByGenres(movies, rawRules, ruleMatchType);

    const genresTags = addQuantityProperty(rawRules, quantities);
    return genresTags;
}

export default Tag;