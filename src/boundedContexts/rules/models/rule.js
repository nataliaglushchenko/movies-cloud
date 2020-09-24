class Rule {}

Rule.create = function createRule(rule) {
    const { ruleId, genre, color, ruleMatchType } = rule;
    return {
        ruleId: ruleId || null,
        genre: genre || '',
        color: color || '',
        ruleMatchType: ruleMatchType || '',
    };
}

Rule.createEmpty = function createEmpty() {
    return {
        ruleId: '',
        genre: '',
        color: '',
        ruleMatchType: ''
    };
};

export default Rule;