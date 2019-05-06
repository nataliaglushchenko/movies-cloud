import reducer from './rules';
import * as actionTypes from '../actions/actionTypes';

describe('rules reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            rules: [],
            loading: false,
            isLoaded: false,
            selectedItem: {}
        });
    });
    it('should fetch rules upon fetchRules call', () => {
        expect(reducer({
            rules: [],
            loading: false,
            isLoaded: false,
            selectedItem: {}
        }, { 
            type: actionTypes.FETCH_RULES_SUCCESS,
            rules: ['some-rule'] })).toEqual({
            rules: ['some-rule'],
            loading: false,
            isLoaded: true,
            selectedItem: {}
        });
    });
});
