import { fetchRulesStarted, fetchRulesSucceeded, fetchRulesFailed } from '../ducks/rules';

export const fetchRules = () => {
    return (dispatch) => {
        dispatch(fetchRulesStarted());

        fetch('http://localhost:4500/rules')
            .then(res => res.json())
            .then(res => {
                dispatch(fetchRulesSucceeded(res));
            })
            .catch(err => {
                dispatch(fetchRulesFailed(err));
            });
    };
}; 