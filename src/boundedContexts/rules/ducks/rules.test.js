import reducer, { FETCH_RULES_SUCCEEDED } from './rules';

describe('rules reducer', () => {
    it('should return the initial state', () => {
        let action = { payload: {}};
        expect(reducer(undefined, action)).toEqual({
            rules: [],
            isLoading: false,
            isLoaded: false
        });
    });
    it('should fetch rules upon fetchRules call', () => {
        expect(reducer({
            rules: [],
            isLoading: false,
            isLoaded: false
        }, { 
            type: FETCH_RULES_SUCCEEDED,
            payload: { rules: ['some-rule']}
        })).toEqual({
            rules: ['some-rule'],
            isLoading: false,
            isLoaded: true
        });
    });
});
