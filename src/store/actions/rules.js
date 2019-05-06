import * as actionTypes from './actionTypes';

export const fetchRulesStart = () => {
    return {
        type: actionTypes.FETCH_RULES_START
    };
};

export const fetchRulesSuccess = (rules) => {
    return {
        type: actionTypes.FETCH_RULES_SUCCESS,
        rules: rules
    };
};

export const fetchRulesFailure = (error) => {
    return {
        type: actionTypes.FETCH_RULES_FAILURE,
        error: error
    };
};

export const fetchRules = () => {
    return (dispatch) => {
        dispatch(fetchRulesStart());
            fetch('http://localhost:4500/rules')
            .then(res => res.json())
            .then(res => {
                dispatch(fetchRulesSuccess(res));
            })
            .catch(err => {
                dispatch(fetchRulesFailure(err));
            });
    };
}; 

export const selectItem = (item) => {
    return {
        type: actionTypes.SELECT_ITEM,
        item: item
    };
};