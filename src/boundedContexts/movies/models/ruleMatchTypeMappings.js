import { SEARCH_MODES } from '../../tags/models/searchModes';
import { RULE_MATCH_TYPES } from '../../rules/models/rulesMatchTypes';

const RULE_MATCH_TYPES_MAP = {
    [SEARCH_MODES.SEARCH_BY_ALL_GENRES]: RULE_MATCH_TYPES.CONTAINS,
    [SEARCH_MODES.SEARCH_BY_MAIN_GENRE]: RULE_MATCH_TYPES.STARTS_WITH,
};

export default RULE_MATCH_TYPES_MAP;