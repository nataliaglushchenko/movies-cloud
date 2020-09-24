import { 
    fetchRulesStarted, 
    fetchRulesSucceeded, 
    fetchRulesFailed
} from '../ducks/rules';

import Rule from '../models/rule';

export const fetchRules = () => {
    return (dispatch) => {
        dispatch(fetchRulesStarted());

        fetch('http://localhost:4500/rules')
            .then(res => res.json())
            .then(res => {
                const rules = res.map(Rule.create);
                dispatch(fetchRulesSucceeded(rules));
            })
            .catch(err => {
                dispatch(fetchRulesFailed(err));
            });
    };
}; 