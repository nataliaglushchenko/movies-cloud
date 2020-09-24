import { 
    fetchRulesStarted, 
    fetchRulesSucceeded, 
    fetchRulesFailed
} from '../ducks/rules';

import { updateGenres } from '../../tags/actions/updateGenres';

import Rule from '../models/rule';

export const fetchRules = () => {
    return (dispatch) => {
        dispatch(fetchRulesStarted());

        fetch('http://localhost:4500/rules')
            .then(res => res.json())
            .then(res => {
                const rules = res.map(Rule.create);
                dispatch(fetchRulesSucceeded(rules));

                dispatch(updateGenres());
            })
            .catch(err => {
                dispatch(fetchRulesFailed(err));
            });
    };
}; 