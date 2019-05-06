import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import "isomorphic-fetch";

import Cloud from '../../components/Cloud';
import GenresCloud from './GenresCloud';

configure({adapter: new Adapter()});

describe('<GenresCloud />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<GenresCloud onFetchRules={() => {}} loading={false} isLoaded={false} />);
    });
    it('renders one <Cloud /> element if rules loaded', () => {
        wrapper.setProps({isLoaded: true});
        expect(wrapper.find(Cloud)).toHaveLength(1);
    });
    it('renders <div>loading...</div> element when loading', () => {
        wrapper.setProps({loading: true});
        expect(wrapper.contains(<div>loading ... </div>)).toEqual(true);
    });
});
