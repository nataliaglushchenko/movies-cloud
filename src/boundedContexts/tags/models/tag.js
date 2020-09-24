import uniq from 'lodash/uniq';
import RULE_MATCH_TYPES_MAP from '../../movies/models/ruleMatchTypeMappings';

class Tag {}

Tag.create = function createTag(tag) {
    const { id, type, quantity, color } = tag;
    return {
        id: id || null,
        type: type || '',
        color: color || '',
        quantity: quantity || '',
    };
}

Tag.createEmpty = function createEmpty() {
    return {
        id: '',
        type: '',
        color: '',
        quantity: ''
    };
};

export function calculateQuantityByGenres(data) {
    return uniq(data.map(item => item.genre))
        .map(genre => {
            return {
                quantity: data.filter(item => item.genre === genre).length,
                type: genre
            };
        });
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
    const decades = calculateQuantityByDecades(movies);
    return decades;
}

Tag.getGenresTags = function getGenresTags(rules, mode) {
    const rawRules = rules.filter(rule => rule.ruleMatchType === RULE_MATCH_TYPES_MAP[mode]);

    const quantities = calculateQuantityByGenres(rawRules);

    const genresTags = addQuantityProperty(rawRules, quantities);
    return genresTags;
}

export default Tag;