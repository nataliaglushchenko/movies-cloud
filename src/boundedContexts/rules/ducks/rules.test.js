import {
    reducer,
    FETCH_RULES_SUCCEEDED
} from './rules';

describe('rules reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            rules: [],
            isLoading: false,
            isLoaded: false,
            selectedItem: {}
        });
    });
    it('should fetch rules upon fetchRules call', () => {
        expect(reducer({
            rules: [],
            isLoading: false,
            isLoaded: false,
            selectedItem: {}
        }, { 
            type: FETCH_RULES_SUCCEEDED,
            rules: ['some-rule'] })).toEqual({
            rules: ['some-rule'],
            isLoading: false,
            isLoaded: true,
            selectedItem: {}
        });
    });
});
