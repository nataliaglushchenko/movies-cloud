import * as actionTypes from '../actions/actionTypes';

const initialState = {
    rules: [],
    loading: false,
    isLoaded: false,
    selectedItem: {}
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_RULES_START: 
            return {
                ...state,
                loading: true,
                isLoaded: false
            };            
        case actionTypes.FETCH_RULES_SUCCESS: 
            return {
                ...state,
                loading: false,
                rules: action.rules,
                isLoaded: true
            }; 
        case actionTypes.FETCH_RULES_FAILURE:
            return {
                ...state,
                loading: false,
                isLoaded: false
            }; 
        case actionTypes.SELECT_ITEM: 
            return {
                ...state,
                selectedItem: action.item
            }; 
        default: 
            return state;
    }  
};

export default reducer;